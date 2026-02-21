Ext.define('Ext.Praxis.view.payments.ControlReportForm.Filters', {
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
                    id: prototype.id + '-panelCredito',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-typeReportSelected',
                                    title: '<span style="color:#1A4D8F;font-weight:bold;">PROCESS STATUS</span>',
                                    width: 225,
                                    style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Select By',
                                            labelAlign: 'left',
                                            width: 200,
                                            labelWidth: 55,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbInputReport',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            editable: false,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            listConfig: {maxHeight: 130},
                                            typeAhead: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            triggerAction: 'all',
                                            value: 'P',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: 'P', name: 'Process Status'},
                                                    {code: 'T', name: 'Total By Conciliation'}
                                                ]
                                            },
                                            listeners: {
                                                change: 'btnSearch_click'
                                            },
                                            margin: '0 10 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1A4D8F;font-weight:bold;">FILTER DATE</span>',
                                    width: 305,
                                    style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
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
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromDay',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            hidden: true,
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
                                            hidden: true,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            width: 43,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-titleAditionalSetBSP',
                                    title: '<span style="color:#1A4D8F;font-weight:bold;">COMBO FILTER</span>',
                                    width: 555,
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
                                                    {code: '', name: 'ALL'}
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
                                            hidden: true,
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
//                                            listeners: {
//                                                keypress: 'btnSearch_click'
//                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtINameFile',
                                            fieldLabel: 'File Name',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 60,
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: 300,
                                            width: 203,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
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
                                            fieldLabel: 'Code Error',
                                            id: prototype.id + '-cmbCodeError',
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
                                            labelWidth: 65,
                                            typeAhead: true,
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            listConfig: {minWidth: 130},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL</span>',
                                    width: 640,
                                    style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Bandoc',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtBANDOC',
                                            labelWidth: 45,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            width: 120,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Refer',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtREFER',
                                            labelWidth: 35,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9A-Za-z]/,
                                            maxLength: 20,
                                            width: 120,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'ID Cont',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIDCONT',
                                            labelWidth: 48,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9A-Za-z]/,
                                            maxLength: 25,
                                            width: 120,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Header',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtHeaderText',
                                            labelWidth: 40,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9A-Za-z]/,
                                            maxLength: 20,
                                            width: 120,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Acc Prov',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAccprov',
                                            labelWidth: 50,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9A-Za-z]/,
                                            maxLength: 6,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelCash',
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
                            title: '<span style="color:#1A4D8F;font-weight:bold;">PERIOD</span>',
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
                                    id: prototype.id + '-cmbInputDateARC',
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
                                            {code: 'P', name: 'Period'},
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
                                    width: 43,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    margin: '0 10 0 0'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleAditionalSetARC',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL</span>',
                            width: 620,
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
                                    id: prototype.id + '-typeSocietyARC',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbComand',
                                    fieldLabel: 'Comand',
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
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    triggerAction: 'all',
                                    margin: '0 10 0 0',
                                    value: '',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'DISBADV', name: 'DISBADV'},
                                            {code: 'CARRDED', name: 'CARRDED'},
                                            {code: '', name: 'All'}
                                        ]
                                    },
                                    listeners: {
                                        keypress: 'btnSearch_click'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtINameFileARC',
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



