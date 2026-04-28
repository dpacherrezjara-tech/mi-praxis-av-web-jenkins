Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '0px 0 8px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDuplicates',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'start'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">PAYMENT DATE</span>',
                                    width: 390,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            hidden: true,
                                            labelWidth: 60,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbInputDate',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            listConfig: {maxHeight: 130},
                                            typeAhead: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: 'S',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: 'S', name: 'Payment Date'}
                                                ]
                                            },
                                            listeners: {
                                                change: 'btnSearch_click'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYear',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'From',
                                            width: 95,
                                            labelWidth: 35,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'cbxDateFromYear_changeHandler'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: '',
                                            width: 48,
                                            labelWidth: 0,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            listeners: {
                                                change: 'cbxDateFromMonth_changeHandler'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDay',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 0,
                                            width: 43,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            listeners: {
                                                change: 'selectComboFromDay'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYear',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'To',
                                            width: 80,
                                            labelWidth: 20,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonth',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: '',
                                            width: 48,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
                                            maxLength: 3,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDay',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            width: 43,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            margin: '0 10 0 0'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">COMBO FILTERS</span>',
                                    width: 1020,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Customer',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 55,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: false,
                                            id: prototype.id + '-typeClient',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            listConfig: {maxHeight: 130},
                                            typeAhead: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: '134',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'},
//                                    {code: '', name: 'ALL'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Processor',
                                            id: prototype.id + '-cmbProcessor',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 180,
                                            labelWidth: 55,
                                            typeAhead: true,
                                            valueField: 'A4451KEY2',
                                            displayField: 'A4451KEY3',
                                            listConfig: {minWidth: 130},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbStatus',
                                            fieldLabel: 'Status',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "ALL"],
                                                    ["1", "Match"],
                                                    ["3", "Settlement Without Sales"],
                                                    ["5", "Match Manual"]
                                                ]
                                            }),
                                            width: 150,
                                            labelWidth: 40,
                                            emptyText: 'All',
                                            value: '',
                                            displayField: 'description',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            filterPickList: true,
                                            editable: true,
                                            multiSelect: false,
                                            forceSelection: true,
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountry',
                                            fieldLabel: 'Country',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 219,
                                            labelWidth: 50,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 200},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbNEGOC',
                                            fieldLabel: 'Business',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 54,
                                            width: 150,
                                            anchor: '100%',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFase2',
                                            fieldLabel: 'Fase 2',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "ALL"],
                                                    ["Y", "Yes"],
                                                    ["N", "No"]
                                                ]
                                            }),
                                            width: 100,
                                            labelWidth: 40,
                                            emptyText: 'All',
                                            value: '',
                                            displayField: 'description',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            filterPickList: true,
                                            editable: true,
                                            multiSelect: false,
                                            forceSelection: true,
                                            margin: '0 10 0 0'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">INPUT FILTERS</span>',
                                    width: 735,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCodeBank',
                                            fieldLabel: 'Code Bank',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            labelWidth: 64,
                                            width: 120,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSecuence',
                                            fieldLabel: 'With Secuence',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "ALL"],
                                                    ["Y", "Yes"],
                                                    ["N", "No"]
                                                ]
                                            }),
                                            width: 150,
                                            labelWidth: 85  ,
                                            emptyText: 'All',
                                            value: '',
                                            displayField: 'description',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            filterPickList: true,
                                            editable: true,
                                            multiSelect: false,
                                            forceSelection: true,
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSecuence',
                                            fieldLabel: 'Secuence',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 55,
                                            width: 110,
                                            margin: '0 10 0 0',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCardType',
                                            fieldLabel: 'CC Type',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 50,
                                            width: 110,
                                            margin: '0 10 0 0',
                                            maxLength: 2,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTDoc',
                                            fieldLabel: 'Type Document',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 90,
                                            width: 180,
                                            anchor: '100%',
                                            margin: '0 10 0 0'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">PROCESS ACTIONS</span>',
                                    width: 220,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn_AllInfo',
                                            text: 'ALL PROCESS',
                                            cls: 'btn-process-secondary',
                                            handler: 'confirmAllSettlementsSelected',
                                            margin: '0 8 0 0',
                                            tooltip: 'Elimina los registros en estado pendiente de la grilla'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn_SelectAllInfo',
                                            text: 'PROCESS',
                                            cls: 'btn-process-secondary',
                                            handler: 'confirmSettlementsSelected',
                                            tooltip: 'Elimina los registros seleccionados de la grilla'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelRemoved',
                    bodyStyle: 'background: transparent',
                    border: false,
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">PAYMENT DATE</span>',
                            width: 390,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 170,
                                    hidden: true,
                                    labelWidth: 60,
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbInputDateRemoved',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: 'S',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'S', name: 'Payment Date'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYearRemoved',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    editable: false,
                                    fieldLabel: 'From',
                                    width: 95,
                                    labelWidth: 35,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonthRemoved',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    editable: false,
                                    fieldLabel: '',
                                    width: 48,
                                    labelWidth: 0,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDayRemoved',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 43,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        change: 'selectComboFromDay'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYearRemoved',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    editable: false,
                                    fieldLabel: 'To',
                                    width: 80,
                                    labelWidth: 20,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonthRemoved',
                                    fieldStyle: 'text-align: left;',
                                    disabled: false,
                                    editable: false,
                                    fieldLabel: '',
                                    width: 48,
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    maxLength: 3,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDayRemoved',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 43,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    margin: '0 10 0 0'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">COMBO FILTERS</span>',
                            width: 170,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Customer',
                                    xtype: 'combo',
                                    width: 150,
                                    labelWidth: 55,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    disabled: false,
                                    id: prototype.id + '-typeClientRemoved',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '134',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '133', name: 'LACSA'},
                                            {code: '134', name: 'AVIANCA'},
                                            {code: '202', name: 'TACA'},
                                            {code: '547', name: 'AEROGAL'},
//                                    {code: '', name: 'ALL'}
                                        ]
                                    },
                                    margin: '0 10 0 0'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">PROCESS ACTIONS</span>',
                            width: 220,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn_AllInfoReverse',
                                    text: 'ALL PROCESS',
                                    cls: 'btn-process-secondary',
                                    handler: 'confirmAllSettlementsSelectedReverse',
                                    margin: '0 8 0 0',
                                    tooltip: 'Restaura los registros en estado pendiente de la grilla'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn_SelectAllInfoReverse',
                                    text: 'PROCESS',
                                    cls: 'btn-process-secondary',
                                    handler: 'confirmSettlementsSelectedReverse',
                                    tooltip: 'Restaura los registros seleccionados de la grilla'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

Ext.util.CSS.createStyleSheet(`
    /* Secondary action */
    .btn-process-secondary {
        background-color: #f5f7fa !important;
        border: 1px solid #c9d4e2 !important;
        border-radius: 5px !important;
        color: #24678D !important;
        font-weight: bold !important;
        font-size: 10px !important;
        padding: 0px 14px !important;
        height: 22px !important;
        line-height: 24px !important;
        transition: all .2s ease-in-out;
    }

    .btn-process-secondary.x-btn-over {
        background-color: #e8eef7 !important;
    }

    .btn-process-secondary.x-btn-pressed {
        background-color: #24678D !important;
        border-color: #24678D !important;
        color: white !important;
    }

    .btn-process-primary .x-btn-inner,
    .btn-process-secondary .x-btn-inner {
        color: inherit !important;
    }
`, 'btn-process-actions-style');
