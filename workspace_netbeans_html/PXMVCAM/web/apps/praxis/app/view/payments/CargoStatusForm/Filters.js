Ext.define('Ext.Praxis.view.payments.CargoStatusForm.Filters', {
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
            margin: '10px 0 10px 15px',
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
                    id: prototype.id + '-panelBSP',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleFieldsetBSP',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">FILTERS</span>',
                            width: 1400,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {type: 'hbox', align: 'middle'},
                                    margin: '0 0 8 0',
                                    items: [
                                        {
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            labelWidth: 60,
                                            disabled: true,
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
                                            value: 'P',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: 'S', name: 'Settlement'},
                                                    {code: 'U', name: 'Upload'},
                                                    {code: 'P', name: 'Payment Date'}
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
                                            disabled: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 0,
                                            width: 43,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            margin: '0 10 0 0',
                                            listeners: {
                                                change: 'cbxDateFromDay_changeHandler'
                                            },
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
                                            enforceMaxLength: true,
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
                                            disabled: true,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Customer',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 55,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            id: prototype.id + '-typeSociety',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            disabled: true,
                                            editable: true,
                                            listConfig: {maxHeight: 130},
                                            typeAhead: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: '729',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '729', name: 'TAMPA'},
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
                                            labelWidth: 45,
                                            width: 219,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 111},
                                            triggerAction: 'all',
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'btnSearch_click'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCurrency',
                                            fieldLabel: 'Currency',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            labelWidth: 50,
                                            width: 190,
                                            typeAhead: true,
                                            valueField: 'A005KEY',
                                            displayField: 'A005KEY2',
                                            listConfig: {maxHeight: 111},
                                            triggerAction: 'all',
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'btnSearch_click'
                                            }
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
                                },
                                {
                                    xtype: 'container',
                                    layout: {type: 'hbox', align: 'middle'},
                                    id: prototype.id + '-detailFilterStatement',
                                    hidden: true,
                                    items: [
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
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelARC',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleFieldsetARC',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">FILTERS</span>',
                            width: 1400,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 170,
                                    labelWidth: 60,
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbInputDateARC',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    disabled: true,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    value: 'P',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'S', name: 'Settlement'},
                                            {code: 'U', name: 'Upload'},
                                            {code: 'P', name: 'Payment Date'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYearARC',
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
                                    id: prototype.id + '-cmbDateFromMonthARC',
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
                                    id: prototype.id + '-cmbDateFromDayARC',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    disabled: true,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 43,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        change: 'cbxDateFromDay_changeHandler'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYearARC',
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
                                    id: prototype.id + '-cmbDateToMonthARC',
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
                                    id: prototype.id + '-cmbDateToDayARC',
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
                                    disabled: true,
                                    width: 43,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    margin: '0 10 0 0'
                                },
                                {
                                    fieldLabel: 'Customer',
                                    xtype: 'combo',
                                    width: 150,
                                    labelWidth: 55,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    id: prototype.id + '-typeSocietyARC',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    disabled: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '729',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '729', name: 'TAMPA'},
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCountryARC',
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
                                    labelWidth: 45,
                                    width: 219,
                                    typeAhead: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    listConfig: {maxHeight: 111},
                                    triggerAction: 'all',
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'btnSearch_click'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrencyARC',
                                    fieldLabel: 'Currency',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    labelWidth: 50,
                                    width: 190,
                                    typeAhead: true,
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2',
                                    listConfig: {maxHeight: 111},
                                    triggerAction: 'all',
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'btnSearch_click'
                                    }
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
                                            id: prototype.id + '-dashboardCashARC'
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitchCashCDARC',
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
                                            id: prototype.id + '-detailCASHARC'
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelICCS',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleFieldsetICCS',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">SETTLEMENT</span>',
                            width: 570,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 170,
                                    labelWidth: 60,
                                    xtype: 'combo',
                                    disabled: true,
                                    id: prototype.id + '-cmbInputDateICCS',
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
                                            {code: 'S', name: 'Settlement'},
                                            {code: 'U', name: 'Upload'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYearICCS',
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
                                        change: 'selectComboFromYearICCS'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonthICCS',
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
                                        change: 'selectComboFromMonthICCS'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDayICCS',
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
                                        change: 'selectComboFromDayARC'
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYearICCS',
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
                                    id: prototype.id + '-cmbDateToMonthICCS',
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
                                    id: prototype.id + '-cmbDateToDayICCS',
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
                            id: prototype.id + '-titleAditionalSetICCS',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL</span>',
                            width: 390,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
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
                                    id: prototype.id + '-typeSocietyICCS',
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtINameFileICCS',
                                    fieldLabel: 'File Name',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelWidth: 60,
                                    enforceMaxLength: true,
                                    hidden: false,
                                    maxLength: 300,
                                    width: 203,
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'eventKey'
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
});



