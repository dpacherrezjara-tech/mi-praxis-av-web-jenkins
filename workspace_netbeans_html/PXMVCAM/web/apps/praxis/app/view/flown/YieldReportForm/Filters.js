Ext.define('Ext.Praxis.view.flown.YieldReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
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
                {
                    xtype: 'panel',
                    border: false,
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
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
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date</strong>',
                            id: prototype.id + '-lblFlightDate',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 8},
                        {
                            xtype: 'label',
                            html: 'From:',
                            align: 'center',
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
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromYearChange'
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
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromMonthChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromDayChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'To:',
                            align: 'center',
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
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToYearChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToMonthChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onToDayChange'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Status',
                            hidden: true,
                            style: 'font-weight:bold;color:#000;'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatus',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],
                                    ["6", "Error"],
                                    ["7", "Error - Not Flown"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            hidden: true,
                            width: 130,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            triggerAction: 'all',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Country of Sale:',
                            hidden: true,
                            style: 'font-weight:bold;color:#000;'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCountry',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            hidden: true,
                            width: 130,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            triggerAction: 'all',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    style: 'border-top: 3px #ffffff solid;border-left: 0px;',
                    padding: '0px 0px 1px 0px',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        //                fieldStyle: 'text-align: center;',
                        padding: '4px 0px 1px 0px',
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
                            xtype: 'label',
                            html: 'Departure City:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '7px 7px 6px 0px'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCDEPART',
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            hiddenLabel: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 200,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            listeners: {
                                focus: function (combo) {
                                    combo.expand();
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Arrival City:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCARRIVA',
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            hiddenLabel: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 200,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            listeners: {
                                focus: function (combo) {
                                    combo.expand();
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            html: 'Flight Number:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 5,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});