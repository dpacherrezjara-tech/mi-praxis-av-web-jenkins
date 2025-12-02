Ext.define('Ext.Praxis.view.payments.ReconciliationReportForm.Filters', {
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
                    xtype: 'fieldset',
                    title: '<span style="color:#1A4D8F;font-weight:bold;">VALDATE</span>',
                    width: 390,
                    style: 'border: 1px solid #1A4D8F; padding: 6px; margin: 5px;',
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
                                change: 'cbxDateFromDay_changeHandler'
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
                    title: '<span style="color:#1A4D8F;font-weight:bold;">UPLOAD FILE</span>',
                    width: 390,
                    hidden: true,
                    style: 'border: 1px solid #1A4D8F; padding: 6px; margin: 5px;',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateUploadFromYear',
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
                            id: prototype.id + '-cmbDateUploadFromMonth',
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
                            id: prototype.id + '-cmbDateUploadFromDay',
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
                            id: prototype.id + '-cmbDateUploadToYear',
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
                            id: prototype.id + '-cmbDateUploadToMonth',
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
                            id: prototype.id + '-cmbDateUploadToDay',
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
                    title: '<span style="color:#1A4D8F;font-weight:bold;">ADDITIONAL ACCOUNTING</span>',
                    width: 1050,
                    style: 'border: 1px solid #1A4D8F; padding: 6px; margin: 5px;',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIAccountingID',
                            fieldLabel: 'Accounting ID',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            labelWidth: 80,
                            enforceMaxLength: true,
//                            maskRe: /[0-9A-Za-z]/, 
                            maxLength: 300,
                            width: 203,
                            enableKeyEvents: true,
                            margin: '0 10 0 0',
                            listeners: {
//                                keyup: 'onUpperValue',
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtICorreAV',
                            fieldLabel: 'Correlativo AV',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            labelWidth: 80,
                            enforceMaxLength: true,
//                            maskRe: /[0-9A-Za-z]/, 
                            maxLength: 300,
                            width: 203,
                            enableKeyEvents: true,
                            margin: '0 10 0 0',
                            listeners: {
//                                keyup: 'onUpperValue',
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtBandoc',
                            fieldLabel: 'Bandoc',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            labelWidth: 45,
                            enforceMaxLength: true,
//                            maskRe: /[0-9A-Za-z]/, 
                            maxLength: 300,
                            width: 203,
                            enableKeyEvents: true,
                            margin: '0 10 0 0',
                            listeners: {
//                                keyup: 'onUpperValue',
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtReferencia',
                            fieldLabel: 'Referencia',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            labelWidth: 60,
                            enforceMaxLength: true,
//                            maskRe: /[0-9A-Za-z]/, 
                            maxLength: 300,
                            width: 203,
                            enableKeyEvents: true,
                            margin: '0 10 0 0',
                            listeners: {
//                                keyup: 'onUpperValue',
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatusSap',
                            fieldLabel: 'Status SAP',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["", "ALL"],
                                    ["L", "Load"],
                                    ["P", "Pending"],
                                    ["S", "Send"]
                                ]
                            }),
                            width: 180,
                            labelWidth: 63,
                            emptyText: 'All',
                            value: '',
                            displayField: 'description',
                            valueField: 'value',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: false,
                            forceSelection: true
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL EXTRACT</span>',
                    width: 550,
                    style: 'border: 1px solid #1A4D8F; padding: 6px; margin: 5px;',
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
                            forceSelection: true
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
                            listeners: {
                                keypress: 'btnSearch_click'
                            }
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
//                            maskRe: /[0-9A-Za-z]/, 
                            maxLength: 300,
                            width: 203,
                            enableKeyEvents: true,
                            margin: '0 10 0 0',
                            listeners: {
//                                keyup: 'onUpperValue',
                                keypress: 'eventKey'
                            }
                        }
                    ]
                },
            ]
        }
    ]
});



