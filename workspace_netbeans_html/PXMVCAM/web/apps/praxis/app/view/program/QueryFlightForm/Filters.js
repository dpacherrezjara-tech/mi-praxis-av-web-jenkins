Ext.define('Ext.Praxis.view.program.QueryFlightForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%',
                width: prototype.widthContenedor
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    border: false,
                    layout: 'vbox',
                    bodyStyle: 'background: transparent;"',
                    style: 'border-top: 4px #ffffff solid;border-left: 0px;',
                    defaults: {
                        padding: '4',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: prototype.widthContenedor - 10,
                            layout: 'vbox',
                            bodyStyle: 'background-color: #FFFFFF;',
                            defaults: {
                                padding: '4px 4px 4px 4px',
                                width: prototype.widthContenedor - 25,
                                anchor: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="cabecera">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '10px 4px 0px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">And/Or</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 200},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Field</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 152},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Condition</strong>',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            padding: '2px 7px 2px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 100},
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
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Select...',
                                            width: 70,
                                            padding: '4px 0px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 46},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo1',
                                            fieldStyle: 'text-align:left',
                                            width: 280,
                                            padding: '0px 0px 0px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo1',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 280,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                }
                                            }
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
                                                click: 'btnImgInfo_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador1',
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
                                            padding: '0px 0px 0px 0px',
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
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue1',
                                            fieldStyle: 'text-align:left',
                                            width: 220,
                                            padding: '0px 0px 0px 0px',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
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
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 46},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo2',
                                            fieldStyle: 'text-align:left',
                                            width: 280,
                                            padding: '0px 0px 0px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo2',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 280,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                }
                                            }
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
                                                click: 'btnImgInfo_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador2',
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
                                            padding: '0px 0px 0px 0px',
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
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue2',
                                            fieldStyle: 'text-align:left',
                                            width: 220,
                                            padding: '0px 0px 0px 0px',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
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
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 46},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo3',
                                            fieldStyle: 'text-align:left',
                                            width: 280,
                                            padding: '0px 0px 0px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo3',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 280,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                }
                                            }
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
                                                click: 'btnImgInfo_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador3',
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
                                            padding: '0px 0px 0px 0px',
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
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue3',
                                            fieldStyle: 'text-align:left',
                                            width: 220,
                                            padding: '0px 0px 0px 0px',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 4">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '3px 4px 0px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
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
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("AND");
                                                },
                                                focus: function (combo) {
                                                    combo.expand();
                                                },
                                                blur: function (combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("AND");
                                                    }
                                                }
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 46},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCampo4',
                                            fieldStyle: 'text-align:left',
                                            width: 280,
                                            padding: '0px 0px 0px 0px'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCampo4',
                                            queryMode: 'local',
                                            hidden: true,
                                            hiddenLabel: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 280,
                                            typeAhead: true,
                                            emptyText: 'All',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0px 0px 0px 0px',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("");
                                                }
                                            }
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
                                                click: 'btnImgInfo_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbOperador4',
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
                                            padding: '0px 0px 0px 0px',
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
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtValue4',
                                            fieldStyle: 'text-align:left',
                                            width: 220,
                                            padding: '0px 0px 0px 0px',
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Fila 5">
                                {
                                    xtype: 'panel',
                                    border: true,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '3px 4px 10px 10px',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        anchor: '100%',
                                        hiddenLabel: false,
                                        labelAlign: 'right',
                                        xtype: 'textfield',
                                        hidden: false,
                                        selectOnFocus: true,
                                        enableKeyEvents: true,
                                        enforceMaxLength: true
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-imgInfo',
                                            icon: 'resources/img/botones/16x16/information.png',
                                            style: 'background: #E3EAF9',
                                            tooltip: 'View Help Information',
                                            padding: '3px 0px 3px 0px',
                                            border: false,
                                            listeners: {
                                                click: 'btnImgInfoHelp_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 700},
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
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: prototype.widthContenedor - 10,
                            layout: 'vbox',
                            bodyStyle: 'background: transparent;"',
                            padding: '1px 4px 1px 4px',
                            defaults: {
                                padding: '1px 4px 1px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    width: prototype.widthContenedor - 25,
                                    bodyStyle: 'background: #E3EAF9',
                                    layout: 'hbox',
                                    padding: '1px 4px 1px 10px',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 550},
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000;">Action:</strong>',
                                            width: 58,
                                            padding: '4px 0px 1px 0px'
                                        },
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbAction',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["INTERACT", "Excel Interact Generate"],
                                                    ["CONSOLIDATED", "Summary"],
                                                    ["ACCSUM", "Quantity Summary"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            hidden: false,
                                            readOnly: false,
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
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
                                                    combo.setValue("INTERACT");
                                                },
                                                focus: function(combo) {
                                                    combo.expand();
                                                },
                                                blur: function(combo, event, eOpts) {
                                                    if (combo.getValue() === null) {
                                                        combo.setValue("INTERACT");
                                                    }
                                                },
                                                keypress: 'onTextKeypress',
                                                change: 'onCmbActionChange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnOK',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="background:#024F79;color:white;">OK</strong>',
                                            width: 50,
//                                            scale: 'medium',
                                            listeners: {
                                                click: 'btnOK_click'
//                                                mouseover: function(cmp) {
//                                                    cmp.setStyle({
//                                                        'background-color':'#B4DFFC'
//                                                    });
//                                                    cmp.setHtml('<center><strong style="color:#000;background:#B4DFFC;color:#2B3361">OK</strong></center>');
//                                                },
//                                                mouseout: function(cmp) {
//                                                    cmp.setStyle({
//                                                        'background-color':'#024F79'
//                                                    });
//                                                    cmp.setHtml('<center><strong style="background:#024F79;color:white;">OK</strong></center>');
//                                                }
                                            }
                                        }
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