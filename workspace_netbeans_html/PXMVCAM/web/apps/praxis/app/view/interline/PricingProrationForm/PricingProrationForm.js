Ext.define('Ext.Praxis.view.interline.PricingProrationForm.PricingProrationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PricingProrationForm',
    requires: [
        'Ext.Praxis.view.interline.PricingProrationForm.Options',
        'Ext.Praxis.view.interline.PricingProrationForm.Filters',
        'Ext.Praxis.view.interline.PricingProrationForm.Info',
        'Ext.Praxis.controller.interline.PricingProration.PricingProrationController'
    ],
    controller: 'PricingProrationController',
    layout: {
        type: 'fit'
    },
    padding: '0',
    border: false,
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'panel', 
                   border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-main',
                            border: false,
                            region: 'center',
//                          width: 900,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1100,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            //width: 1400,
                                            layout: 'fit',
                                            border: true,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1800,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    id: prototype.id + '-boxGroupData',
                                    hidden: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        align: 'center',
                                        width: 1080
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                                {
                                                    xtype: 'panel',
                                                    border: true,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    bodyStyle: 'background: #E3EAF9',
                                                    defaults: {
                                                        padding: '5 1',
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', width: 7},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Group</label>',
                                                            style: 'font-weight:bold;text-align:left;',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">(*)</label>',
                                                            style: 'font-weight:bold;color:#9C1717;text-align:left;',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtGrupo',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            maskRe: /[0-9]/,
                                                            width: 70,
                                                            readOnly: true,
                                                            listeners: {
                                                                keypress: 'onTextKeypress'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Clearing</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 75
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA050FCONTA',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            readOnly: true,
                                                            width: 70
                                                        },
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Period</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 75
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA050PSTRF',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            readOnly: true,
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Source</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 75,
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Total Invoice Coupons'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA050TUSO',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            readOnly: true,
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Currency</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 75,
                                                            autoEl: {
                                                                tag: 'label',
                                                                'data-qtip': 'Total Missing Coupons'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtA050MNRCD',
                                                            fieldStyle: 'text-align:center;',
                                                            enableKeyEvents: true,
                                                            readOnly: true,
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Airline</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 2},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtAirline',
                                                            fieldStyle: 'text-align:left;',
                                                            enableKeyEvents: true,
                                                            readOnly: true,
                                                            width: 230
                                                        },
                                                        {xtype: 'tbspacer', width: 7}
                                                    ]
                                                },
                                                //</editor-fold>
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-filtroData',
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    bodyStyle: 'background: transparent',
                                                    border: false,
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            width: 1000,
                                                            flex: 1,
                                                            border: false,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center'
                                                            },
                                                            bodyStyle: 'background: white',
                                                            defaults: {
                                                                xtype: 'panel',
                                                                width: 640,
                                                                border: true,
                                                                bodyStyle: 'background: #E3EAF9',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    pack: 'center'
                                                                }
                                                            },
                                                            items: [
                                                                // <editor-fold defaultstate="collapsed" desc="cabecera">
                                                                {
                                                                    layout: 'hbox',
                                                                    padding: '5px 4px 0px 10px',
                                                                    defaults: {
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
                                                                        {
                                                                            xtype: 'label',
                                                                            html: '<strong style="color:#000;">And/Or</strong>',
                                                                            align: 'center',
                                                                            fieldStyle: 'text-align: center;',
                                                                            padding: '2px 7px 2px 0px'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 130},
                                                                        {
                                                                            xtype: 'label',
                                                                            html: '<strong style="color:#000;">Field</strong>',
                                                                            align: 'center',
                                                                            fieldStyle: 'text-align: center;',
                                                                            padding: '2px 7px 2px 0px'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 115},
                                                                        {
                                                                            xtype: 'label',
                                                                            html: '<strong style="color:#000;">Condition</strong>',
                                                                            align: 'center',
                                                                            fieldStyle: 'text-align: center;',
                                                                            padding: '2px 7px 2px 0px'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 70},
                                                                        {
                                                                            xtype: 'label',
                                                                            html: '<strong style="color:#000;">Value</strong>',
                                                                            align: 'center',
                                                                            fieldStyle: 'text-align: center;',
                                                                            padding: '2px 7px 2px 0px'
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                                                {
                                                                    padding: '3px 4px 0px 10px',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Select...',
                                                                            width: 70,
                                                                            padding: '4px 0px 0px 0px'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtCampo1',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 200,
                                                                            padding: '0'
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbCampo1',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "All"], ["A050KEY", "TICKET"],
                                                                                    ["A050BASE", "FARE BASIS"], ["A050TUA", "TUA"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hidden: true,
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 200,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgInfo1',
                                                                            icon: 'resources/img/botones/16x16/information.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'View Fields',
                                                                            padding: '4px 0px 0px 0px',
                                                                            border: false,
                                                                            listeners: {
                                                                                click: 'imgInfo_clickHandler'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbOperador1',
                                                                            queryMode: 'local',
                                                                            allowBlank: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue1',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 120,
                                                                            padding: '0',
                                                                            listeners: {
                                                                                keypress: 'onTextKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgClear1',
                                                                            icon: 'resources/img/botones/clear.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'Clear Options',
                                                                            border: false,
                                                                            width: 40,
                                                                            scale: 'small',
                                                                            padding: '4px 0px 0px 0px',
                                                                            listeners: {
                                                                                click: 'imgClearQ_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                                                {
                                                                    padding: '3px 4px 0px 10px',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbConector2',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["AND", "And"],
                                                                                    ["OR", "Or"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                afterrender: function(combo, eOpts) {
                                                                                    combo.setValue("AND");
                                                                                },
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                },
                                                                                blur: function(combo, event, eOpts) {
                                                                                    if (combo.getValue() === null) {
                                                                                        combo.setValue("AND");
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtCampo2',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 200,
                                                                            padding: '0'
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbCampo2',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "All"], ["A050KEY", "TICKET"],
                                                                                    ["A050BASE", "FARE BASIS"], ["A050TUA", "TUA"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hidden: true,
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 200,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgInfo2',
                                                                            icon: 'resources/img/botones/16x16/information.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'View Fields',
                                                                            padding: '4px 0px 0px 0px',
                                                                            border: false,
                                                                            listeners: {
                                                                                click: 'imgInfo_clickHandler'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbOperador2',
                                                                            queryMode: 'local',
                                                                            allowBlank: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue2',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 120,
                                                                            padding: '0',
                                                                            listeners: {
                                                                                keypress: 'onTextKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgClear2',
                                                                            icon: 'resources/img/botones/clear.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'Clear Options',
                                                                            border: false,
                                                                            width: 40,
                                                                            scale: 'small',
                                                                            padding: '4px 0px 0px 0px',
                                                                            listeners: {
                                                                                click: 'imgClearQ_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                                                {
                                                                    padding: '3px 4px 0px 10px',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbConector3',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["AND", "And"],
                                                                                    ["OR", "Or"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                afterrender: function(combo, eOpts) {
                                                                                    combo.setValue("AND");
                                                                                },
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                },
                                                                                blur: function(combo, event, eOpts) {
                                                                                    if (combo.getValue() === null) {
                                                                                        combo.setValue("AND");
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtCampo3',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 200,
                                                                            padding: '0'
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbCampo3',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "All"], ["A050KEY", "TICKET"],
                                                                                    ["A050BASE", "FARE BASIS"], ["A050TUA", "TUA"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hidden: true,
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 200,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgInfo3',
                                                                            icon: 'resources/img/botones/16x16/information.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'View Fields',
                                                                            padding: '4px 0px 0px 0px',
                                                                            border: false,
                                                                            listeners: {
                                                                                click: 'imgInfo_clickHandler'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbOperador3',
                                                                            queryMode: 'local',
                                                                            allowBlank: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue3',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 120,
                                                                            padding: '0',
                                                                            listeners: {
                                                                                keypress: 'onTextKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgClear3',
                                                                            icon: 'resources/img/botones/clear.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'Clear Options',
                                                                            border: false,
                                                                            width: 40,
                                                                            scale: 'small',
                                                                            padding: '4px 0px 0px 0px',
                                                                            listeners: {
                                                                                click: 'imgClearQ_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                                                {
                                                                    padding: '3px 4px 0px 10px',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbConector4',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["AND", "And"],
                                                                                    ["OR", "Or"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                afterrender: function(combo, eOpts) {
                                                                                    combo.setValue("AND");
                                                                                },
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                },
                                                                                blur: function(combo, event, eOpts) {
                                                                                    if (combo.getValue() === null) {
                                                                                        combo.setValue("AND");
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtCampo4',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 200,
                                                                            padding: '0'
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbCampo4',
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "All"], ["A050KEY", "TICKET"],
                                                                                    ["A050BASE", "FARE BASIS"], ["A050TUA", "TUA"]
                                                                                ]
                                                                            }),
                                                                            queryMode: 'local',
                                                                            hidden: true,
                                                                            hiddenLabel: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 200,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0'
                                                                        },
                                                                        {xtype: 'tbspacer', width: 10},
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgInfo4',
                                                                            icon: 'resources/img/botones/16x16/information.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'View Fields',
                                                                            padding: '4px 0px 0px 0px',
                                                                            border: false,
                                                                            listeners: {
                                                                                click: 'imgInfo_clickHandler'
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 15},
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-cmbOperador4',
                                                                            queryMode: 'local',
                                                                            allowBlank: false,
                                                                            forceSelection: true,
                                                                            selectOnFocus: true,
                                                                            caseSensitive: false,
                                                                            autoSelect: true,
                                                                            editable: true,
                                                                            width: 70,
                                                                            value: "",
                                                                            typeAhead: true,
                                                                            typeAheadDelay: 1,
                                                                            emptyText: 'All',
                                                                            valueField: 'code', displayField: 'name',
                                                                            listConfig: {maxHeight: 111},
                                                                            enableKeyEvents: true,
                                                                            triggerAction: 'all',
                                                                            padding: '0',
                                                                            listeners: {
                                                                                focus: function(combo) {
                                                                                    combo.expand();
                                                                                }
                                                                            }
                                                                        },
                                                                        {xtype: 'tbspacer', width: 21},
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue4',
                                                                            fieldStyle: 'text-align:left',
                                                                            width: 120,
                                                                            padding: '0',
                                                                            listeners: {
                                                                                keypress: 'onTextKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgClear4',
                                                                            icon: 'resources/img/botones/clear.png',
                                                                            style: 'background: #E3EAF9',
                                                                            tooltip: 'Clear Options',
                                                                            border: false,
                                                                            width: 40,
                                                                            scale: 'small',
                                                                            padding: '4px 0px 0px 0px',
                                                                            listeners: {
                                                                                click: 'imgClearQ_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                // </editor-fold>
                                                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                                                {
                                                                    padding: '3px 4px 5px 10px',
                                                                    defaults: {
                                                                        anchor: '100%'
                                                                    },
                                                                    items: [
                                                                        {xtype: 'tbspacer', width: 7},
//                                                                        {
//                                                                            xtype: 'button',
//                                                                            id: prototype.id+'-imgInfo',
//                                                                            icon: 'resources/img/botones/16x16/information.png',
//                                                                            style: 'background: #E3EAF9',
//                                                                            tooltip: 'View Help Information',
//                                                                            padding: '3px 0px 3px 0px',
//                                                                            border: false,
//                                                                            listeners: {
//                                                                                click: 'imgInfoHelp_clickHandler'
//                                                                            }
//                                                                        },
                                                                        {xtype: 'tbspacer', width: 410},
                                                                        {
                                                                            xtype: 'label',
                                                                            text: '(*) Required Fields',
                                                                            labelSeparator: '',
                                                                            style: 'font-weight:bold;color:#B41717;',
                                                                            width: 150,
                                                                            padding: '3px 0px 3px 0px',
                                                                            autoEl: {
                                                                                tag: 'label',
                                                                                'data-qtip': 'Mandatory Field'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                                // </editor-fold>
                                                            ]
                                                        }
                                                    ]
                                                },
                                                //<editor-fold defaultstate="collapsed" desc="Options and Filters">
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            width: 100,
                                                            border: false,
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    cls: 'x-toolbar-pag',
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgFirst',
                                                                            iconCls: 'prx-icon-pagination-first',
                                                                            tooltip: 'First Page',
                                                                            listeners: {
                                                                                click: 'pagFirst'
                                                                            }

                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgPrev',
                                                                            iconCls: 'prx-icon-pagination-previous',
                                                                            tooltip: 'Previous Page',
                                                                            listeners: {
                                                                                click: 'pagPrevious'
                                                                            }

                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgNext',
                                                                            iconCls: 'prx-icon-pagination-next',
                                                                            tooltip: 'Next Page',
                                                                            listeners: {
                                                                                click: 'pagNext'
                                                                            }

                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-imgLast',
                                                                            iconCls: 'prx-icon-pagination-last',
                                                                            tooltip: 'Last Page',
                                                                            listeners: {
                                                                                click: 'pagLast'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'pagingtoolbar',
                                                                            id: prototype.id + '-paggin2',
                                                                            pageSize: 10,
                                                                            border: false,
                                                                            displayInfo: false,
                                                                            hidden: true
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', width: 20},
                                                        {
                                                            xtype: 'panel',
                                                            border: true,
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnSearch2',
                                                                            iconCls: 'prx-icon-search',
                                                                            tooltip: 'Search',
                                                                            listeners: {
                                                                                click: 'imgSearch_clickHandlerTKT'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnFilter2',
                                                                            iconCls: 'prx-icon-filter',
                                                                            tooltip: 'Display filter',
                                                                            listeners: {
                                                                                click: 'imgFilter_clickHandler'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnExcel2',
                                                                            iconCls: 'prx-icon-excel',
                                                                            tooltip: 'Export to Excel',
                                                                            listeners: {
                                                                                click: 'imgExcel_clickHandler'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnClear2',
                                                                            iconCls: 'prx-icon-clear',
                                                                            tooltip: 'Clear Options',
                                                                            listeners: {
                                                                                click: 'imgClear_clickHandler'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnBack2',
                                                                            iconCls: 'prx-icon-back',
                                                                            tooltip: 'Back',
                                                                            listeners: {
                                                                                click: 'imgBack_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', width: 20}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    margin: '5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id + '-lblFlag',
                                                            text: '',
                                                            style: 'text-align:right;color:red;',
                                                            padding: '4 0',
                                                            width: 600
                                                        },
                                                        {xtype: 'tbspacer', width: 15},
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbFuncion',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["", "View All"], ["CR", "Close range of groups"], ["C", "Close group"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            allowBlank: false,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            autoSelect: true,
                                                            editable: true,
                                                            width: 150,
                                                            value: "",
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name',
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            inputAttrTpl: [
                                                                'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
                                                            ],
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                },
                                                                change: 'ChangeFunction'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 10},
                                                        {
                                                            xtype: 'button',
                                                            html: '<strong>Apply</strong>',
                                                            border: true,
                                                            scale: 'small',
                                                            listeners: {
                                                                click: 'CloseGroup_clickHandler',
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 20}
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-hbRange',
                                                    hidden: true,
                                                    width: '100%',
                                                    margin: '5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">Range of Groups</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 140
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            id: prototype.id + '-txtGrupoFrom',
                                                            value: '',
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            maskRe: /[0-9]/,
                                                            width: 80,
                                                            grow: true,
                                                            growMin: 22,
                                                            growMax: 22
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '<label style="vertical-align:middle;">To</label>',
                                                            style: 'font-weight:bold;text-align:center;',
                                                            width: 45
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            id: prototype.id + '-txtGrupoTo',
                                                            value: '',
                                                            enforceMaxLength: true,
                                                            maxLength: 6,
                                                            maskRe: /[0-9]/,
                                                            width: 80,
                                                            grow: true,
                                                            growMin: 22,
                                                            growMax: 22
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'button',
                                                            html: '<strong>Valid</strong>',
                                                            border: true,
                                                            scale: 'small',
                                                            width: 63,
                                                            listeners: {
                                                                click: 'imgSearch_clickHandlerValid'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 20}
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="gridDataGroup">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataGroup',
                                            height: 510,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Ticket', flex: 1,
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Number', dataIndex: 'strTicket', flex: 1, //width: 110,
                                                                listeners: {
                                                                    click: 'viewProrate'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:pointer;";
                                                                    return '<a href="#interline-pricing-proration-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Flight',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'strFormatDate1', width: 130}
                                                        ]
                                                    },
                                                    {
                                                        text: 'Fare',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Basis', dataIndex: 'A050BASE', width: 130,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Sector', dataIndex: 'strDescripcion', width: 80},
                                                    {text: 'Carrier', dataIndex: 'A050TRANSP', width: 60},
                                                    {text: 'Class', dataIndex: 'A050CLASE', width: 60},
                                                    {
                                                        text: 'Gross', dataIndex: 'A050ACEPTA', width: 80, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    {
                                                        text: 'Commision',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'ISC', dataIndex: 'A050COMISI', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = "#" + data.strMarcaCOMI.substring(2);
                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            },
                                                            {
                                                                text: 'CSC', dataIndex: 'A050OVRAMT', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var color = "#" + data.strMarcaOVERISC.substring(2);
                                                                    metaData.style = "text-align:right;color:" + color + ";";
                                                                    return win.formatDblNumber(value);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Tax', dataIndex: 'A050TUA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = "#" + data.strMarcaTAX.substring(2);
                                                            metaData.style = "text-align:right;color:" + color + ";";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    },
                                                    {
                                                        text: 'Neto', dataIndex: 'A050NETO', width: 90, sortable: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            var color = "#" + data.strMarcaNETO.substring(2);
                                                            metaData.style = "text-align:right;color:" + color + ";";
                                                            return win.formatDblNumber(value);
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxPagDetail',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    height: '100%',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label',
                                                        margin: '3 0 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Page',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lblPagActual',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lblPagTotal',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lblRowsTotal',
                                                            text: '0',
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
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



