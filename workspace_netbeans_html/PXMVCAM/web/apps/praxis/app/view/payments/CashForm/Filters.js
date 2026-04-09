Ext.create('Ext.Component', {
    renderTo: Ext.getBody(),
    html: '<style type="text/css">' +
            '.button-off {' +
            '  background-color: #f44336;' + // Red color for OFF
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '.button-on {' +
            '  background-color: #4CAF50;' + // Green color for ON
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '</style>'
});


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
                    id: prototype.id + '-panelCash',
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
                                    id: prototype.id + '-titleFieldsetDashboard',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER DATE</span>',
                                    width: 1320,
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
                                            disabled: true,
                                            id: prototype.id + '-typeSocietyCash',
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
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            labelWidth: 60,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbInputDateCash',
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
                                            id: prototype.id + '-cmbDateFromYearCash',
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
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonthCash',
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
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDayCash',
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
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYearCash',
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
                                            id: prototype.id + '-cmbDateToMonthCash',
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
                                            id: prototype.id + '-cmbDateToDayCash',
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
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCfuenteCash',
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
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountryCash',
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
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            padding: '0 10 0 10',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Dashboard',
                                                    margin: '0 5 0 0',
                                                    width: 60,
                                                    id: prototype.id + '-dashboardCash'
                                                },
                                                {
                                                    xtype: 'component',
                                                    id: prototype.id + '-btnToggleSwitchCashCD',
                                                    margin: '0 5 0 0',
                                                    html: `<style>
                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                .toggle-input{opacity:0;width:0;height:0;}
                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                            </style>
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Detail',
                                                    margin: '0 0 0 5',
                                                    width: 60,
                                                    id: prototype.id + '-detailCASH'
                                                },
                                            ]
                                        }
                                    ]
                                }
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
                                    hidden: true,
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER SALE</span>',
                                    width: 1360,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Doc. Type',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 60,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            id: prototype.id + '-DOCTYPECash',
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
                                                    {code: '', name: 'All'},
                                                    {code: 'S', name: 'SALES'},
                                                    {code: 'D', name: 'ADM'},
                                                    {code: 'R', name: 'REFUND'},
                                                    {code: 'C', name: 'ACM'},
                                                    {code: 'A', name: 'AJUST'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Payment Method',
                                            xtype: 'combo',
                                            width: 200,
                                            labelWidth: 95,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: false,
                                            id: prototype.id + '-paymentMethodCash',
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
                                            id: prototype.id + '-cmbStatusCash',
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
                                            fieldLabel: 'Agent:',
                                            id: prototype.id + '-txtAGENTECash',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            labelWidth: 40,
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
                                            id: prototype.id + '-txtTICKETCash',
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
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Invoice:',
                                            id: prototype.id + '-txtINVOICECash',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 22,
                                            labelWidth: 45,
                                            width: 210,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Currency:',
                                            id: prototype.id + '-txtCURRENCYCash',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            labelWidth: 54,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Bandoc:',
                                            id: prototype.id + '-txtBANDOCCash',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            labelWidth: 45,
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
                                            id: prototype.id + '-titleFieldsetAccounting',
                                            title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER ACCOUNTING</span>',
                                            width: 220,
                                            hidden: true,
                                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbStatusAccountingCash',
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
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelCredit',
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
                                    id: prototype.id + '-titleFieldsetDashboardCredit',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER DATE</span>',
                                    width: 1320,
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
                                            disabled: true,
                                            id: prototype.id + '-typeSocietyCredit',
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
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            labelWidth: 60,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbInputDateCredit',
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
                                            id: prototype.id + '-cmbDateFromYearCredit',
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
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonthCredit',
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
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDayCredit',
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
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYearCredit',
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
                                            id: prototype.id + '-cmbDateToMonthCredit',
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
                                            id: prototype.id + '-cmbDateToDayCredit',
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
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCfuenteCredit',
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
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountryCredit',
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
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            padding: '0 10 0 10',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Dashboard',
                                                    margin: '0 5 0 0',
                                                    width: 60,
                                                    id: prototype.id + '-dashboardCredit'
                                                },
                                                {
                                                    xtype: 'component',
                                                    id: prototype.id + '-btnToggleSwitchCreditCD',
                                                    margin: '0 5 0 0',
                                                    html: `<style>
                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                .toggle-input{opacity:0;width:0;height:0;}
                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                            </style>
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Detail',
                                                    margin: '0 0 0 5',
                                                    width: 60,
                                                    id: prototype.id + '-detailCredit'
                                                },
                                            ]
                                        }
                                    ]
                                }
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
                                    id: prototype.id + '-titleFieldsetSaleCredit',
                                    hidden: true,
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER SALE</span>',
                                    width: 1490,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbStatusCredit',
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
                                            fieldLabel: 'Doc. Type',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 60,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            id: prototype.id + '-DOCTYPECredit',
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
                                                    {code: 'S', name: 'SALES'},
                                                    {code: 'D', name: 'DEBITS'},
                                                    {code: 'R', name: 'REFUND'},
                                                    {code: 'C', name: 'CHBCK'},
                                                    {code: 'A', name: 'ACREDIT'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Ticket:',
                                            id: prototype.id + '-txtTICKETCredit',
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
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'PNR:',
                                            id: prototype.id + '-txtPNRCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            labelWidth: 30,
                                            width: 90,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'CC Number:',
                                            id: prototype.id + '-txtSCARDNCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            labelWidth: 65,
                                            width: 130,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '*****(*):',
                                            id: prototype.id + '-txtSCARDNCORCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            labelWidth: 55,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Authorization:',
                                            id: prototype.id + '-txtAUTHORIZATIONCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 6,
                                            labelWidth: 75,
                                            width: 140,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'CC Type:',
                                            id: prototype.id + '-txtCCTYPECredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            labelWidth: 50,
                                            width: 90,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Agent:',
                                            id: prototype.id + '-txtSAGENTCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            labelWidth: 35,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Currency:',
                                            id: prototype.id + '-txtCURRENCYCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            maskRe: /[A-Za-z0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            labelWidth: 54,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Amount:',
                                            id: prototype.id + '-txtAMOUNTCredit',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            labelWidth: 45,
                                            width: 130,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            },
                                            margin: '0 10 0 0'
                                        },
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
