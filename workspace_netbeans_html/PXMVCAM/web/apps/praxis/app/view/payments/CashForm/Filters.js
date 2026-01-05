Ext.define('Ext.Praxis.view.payments.CashForm.Filters', {
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
                    id: prototype.id + '-panelDashbaord',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleFieldsetDashboard',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">SALES DATE</span>',
                            width: 570,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 170,
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
                                    value: '1',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '1', name: 'Sales Date'},
                                            {code: '2', name: 'Accounting Date'},
                                            {code: '3', name: 'Bill Date'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYearDash',
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
                                    id: prototype.id + '-cmbDateFromMonthDash',
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
                                    id: prototype.id + '-cmbDateFromDayDash',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    disabled: true,
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
                                    id: prototype.id + '-cmbDateToYearDash',
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
                                    id: prototype.id + '-cmbDateToMonthDash',
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
                                    id: prototype.id + '-cmbDateToDayDash',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    disabled: true,
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
                            id: prototype.id + '-titleFieldsetDashboardAditional',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">ADITIONAL SALE</span>',
                            width: 560,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCountryDashboard',
                                    fieldLabel: 'Country',
                                    width: 200,
                                    labelWidth: 50,
                                    queryMode: 'local',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    typeAhead: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCfuenteDashboard',
                                    fieldLabel: 'Source',
                                    width: 200,
                                    labelWidth: 50,
                                    queryMode: 'local',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'button',
                                    text: 'View Credit Card',
                                    id: prototype.id + '-viewCreditDash',
                                    cls: 'btn-credit-card',
                                    margin: '0 4 0 0',
                                    handler: 'onViewCreditCardClick'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelDetail',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-titleFieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">SALES DATE</span>',
                                    width: 570,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            labelWidth: 60,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbInputDateDetail',
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
                                                    {code: 'S', name: 'Sales Date'}
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
                                    id: prototype.id + '-titleFieldsetAccounting',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">ACCOUNTING</span>',
                                    width: 860,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbStatusAccounting',
                                            fieldLabel: 'Status',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"],
                                                    ["1", "Pending"],
                                                    ["3", "Processed"]
                                                ]
                                            }),
                                            width: 180,
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
                                            xtype: 'button',
                                            text: 'View Credit Card',
                                            id: prototype.id + '-viewCreditDetail',
                                            cls: 'btn-credit-card',
                                            margin: '0 4 0 0',
                                            handler: 'onViewCreditCardClick'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-titleFieldsetSale',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">ADITIONAL SALE</span>',
                                    width: 1070,
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
                                            id: prototype.id + '-typeSociety',
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
                                            value: '',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'},
                                                    {code: '', name: 'All'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Payment Method',
                                            xtype: 'combo',
                                            width: 200,
                                            labelWidth: 100,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: false,
                                            id: prototype.id + '-paymentMethod',
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
                                            value: '',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '', name: 'All'},
                                                    {code: 'EP', name: 'Easy Pay'},
                                                    {code: 'CA', name: 'Cash'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountry',
                                            fieldLabel: 'Country',
                                            width: 200,
                                            labelWidth: 50,
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
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
                                                    ["", "All"],
                                                    ["1", "Match"],
                                                    ["3", "Settlement Without Sales"],
                                                    ["5", "Match Manual"]
                                                ]
                                            }),
                                            width: 180,
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
                                            xtype: 'textfield',
                                            fieldLabel: 'Agente:',
                                            id: prototype.id + '-txtAGENTE',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            labelWidth: 45,
                                            width: 120,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Ticket:',
                                            id: prototype.id + '-txtTICKET',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            labelWidth: 40,
                                            width: 150,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
});
