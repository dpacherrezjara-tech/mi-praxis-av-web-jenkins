Ext.define('Ext.Praxis.view.payments.DebitsReportForm.Filters', {
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
                    layout: 'column',
                    items: [
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleFieldsetBSP',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">DATE CREATE</span>',
                            width: 1450,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px; float: left;',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 10 0',
                                    items: [
                                        
                                        {
                                            fieldLabel: 'Doctype',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 48,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: false,
                                            id: prototype.id + '-filterDoctype',
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
                                            value: 'R',
                                            tpl: Ext.create('Ext.XTemplate',
                                                    '<ul class="x-list-plain"><tpl for=".">',
                                                    '<li role="option" class="x-boundlist-item" ',
                                                    '<tpl if="isDisabled">style="color: #bcbcbc; cursor: not-allowed; background: #f9f9f9;"</tpl>>',
                                                    '{name}</li>',
                                                    '</tpl></ul>'
                                                    ),
                                            store: {
                                                fields: ['code', 'name', 'isDisabled'],
                                                data: [
                                                    {code: 'S', name: 'Sales', isDisabled: true},
                                                    {code: 'D', name: 'Debito', isDisabled: true},
                                                    {code: 'R', name: 'Refund'},
                                                    {code: 'C', name: 'Chargeback'},
                                                    {code: 'A', name: 'Acredit'}
                                                ]
                                            },
                                            margin: '0 10 0 0',
                                            listeners: {
                                                change: 'onChangeDoctype',
                                                beforeselect: function (combo, record, index) {
                                                    if (record.get('isDisabled')) {
                                                        return false;
                                                    }
                                                }
                                            }
                                        },
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
                                            value: 'S',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: 'S', name: 'Date Create'}
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
                                            allowBlank: true,
                                            forceSelection: true,
                                            multiSelect: true,
                                            editable: false,
                                            emptyText: 'All',
                                            listConfig: {maxHeight: 130},
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'}
                                                ]
                                            },
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
                                                    ["3", "Pending"],
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
                                            labelWidth: 45,
                                            width: 190,
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
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            id: prototype.id + '-txtNETO',
                                            fieldLabel: 'Neto',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 30,
                                            width: 110,
                                            margin: '0 10 0 0',
                                            hideTrigger: true,
                                            allowExponential: false,
                                            allowDecimals: true,
                                            decimalSeparator: '.',
                                            decimalPrecision: 2,
                                            minValue: 0,
                                            allowBlank: true,
                                            value: null,
                                            emptyText: '',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
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
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Card',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            labelWidth: 30,
                                            width: 185,
                                            layout: 'hbox',
                                            margin: '0 5 0 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-filterScardn1',
                                                    emptyText: '6 DIGITS',
                                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                                    width: 70,
                                                    margin: '0 5 0 0',
                                                    maxLength: 6,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'eventKey'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-filterScardn2',
                                                    emptyText: '4 DIGITS',
                                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                                    width: 60,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'eventKey'
                                                    }
                                                }
                                            ]
                                        },
//                                        Adicionales
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterSauthoc',
                                            hidden: true,
                                            fieldLabel: 'Authorization',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 78,
                                            width: 150,
                                            margin: '0 10 0 0',
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterSagent',
                                            hidden: true,
                                            fieldLabel: 'Agent',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 40,
                                            width: 120,
                                            margin: '0 10 0 0',
                                            maxLength: 8,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterTicket',
                                            hidden: true,
                                            fieldLabel: 'Ticket',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 35,
                                            width: 140,
                                            margin: '0 10 0 0',
                                            maxLength: 13,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterPnr',
                                            hidden: true,
                                            fieldLabel: 'PNR',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 30,
                                            width: 90,
                                            margin: '0 10 0 0',
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbRembolsoCintaVenta',
                                            hidden: true,
                                            fieldLabel: 'Reembolso Cinta de Venta',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"],
                                                    ["Y", "Yes"],
                                                    ["N", "No"]
                                                ]
                                            }),
                                            width: 230,
                                            labelWidth: 145,
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
                                            id: prototype.id + '-filterIDDEB',
                                            hidden: true,
                                            fieldLabel: 'ID',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 20,
                                            width: 120,
                                            margin: '0 10 0 0',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterIDDEBCONCEPT',
                                            hidden: true,
                                            fieldLabel: 'ID Concept',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 70,
                                            width: 130,
                                            margin: '0 10 0 0',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterCasoCVS',
                                            hidden: true,
                                            fieldLabel: 'Caso CVS',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 55,
                                            width: 150,
                                            margin: '0 10 0 0',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
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
                                            maxLength: 300,
                                            width: 203,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
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
                            title: '<span style="color:#1A4D8F;font-weight:bold;">DATE CREATE</span>',
                            width: 1450,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px; float: left;',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 10 0',
                                    items: [
                                        {
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            width: 170,
                                            disabled: true,
                                            hidden: true,
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
                                                    {code: 'P', name: 'Abono Date'}
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
                                            allowBlank: true,
                                            forceSelection: true,
                                            multiSelect: true,
                                            editable: false,
                                            emptyText: 'All',
                                            listConfig: {maxHeight: 130},
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Processor',
                                            labelAlign: 'left',
                                            id: prototype.id + '-cmbCOREP',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 150,
                                            labelWidth: 55,
                                            typeAhead: true,
                                            valueField: 'A4451KEY2',
                                            displayField: 'A4451KEY3',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Debtype',
                                            labelAlign: 'left',
                                            id: prototype.id + '-cmbDEBTYPE',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 150,
                                            labelWidth: 50,
                                            typeAhead: true,
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbBank',
                                            fieldLabel: 'Code Bank',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            labelWidth: 65,
                                            width: 150,
                                            typeAhead: true,
                                            valueField: 'CODEBANK',
                                            displayField: 'IN_CODE_IN_NAME',
                                            listConfig: {maxHeight: 111},
                                            triggerAction: 'all',
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
                                            width: 150,
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
                                            id: prototype.id + '-cmbBPOCOMMENT',
                                            fieldLabel: 'BPO Comment',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['CODE', 'NAME'], 
                                                data: []
                                            }),
                                            width: 200,
                                            labelWidth: 85,
                                            emptyText: 'All',
                                            value: '',
                                            displayField: 'NAME',
                                            valueField: 'CODE',
                                            queryMode: 'local',
                                            filterPickList: true,
                                            editable: true,
                                            multiSelect: false,
                                            forceSelection: true,
                                            margin: '0 10 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            id: prototype.id + '-txtTOTAL',
                                            fieldLabel: 'Monto Local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 75,
                                            width: 150,
                                            margin: '0 10 0 0',
                                            hideTrigger: true,
                                            allowExponential: false,
                                            allowDecimals: true,
                                            decimalSeparator: '.',
                                            decimalPrecision: 2,
                                            minValue: 0,
                                            allowBlank: true,
                                            value: null,
                                            emptyText: '',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Bandoc',
                                            labelAlign: 'left',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtBANDOC',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            width: 130,
                                            labelWidth: 50,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Reference',
                                            labelAlign: 'left',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtreference',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            width: 130,
                                            labelWidth: 60,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            maxLength: 30,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterSagentARC',
                                            fieldLabel: 'Agent',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 40,
                                            width: 120,
                                            margin: '0 10 0 0',
                                            maxLength: 8,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIDAccounting',
                                            fieldLabel: 'ID Accounting',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 80,
                                            width: 130,
                                            margin: '0 10 0 0',
                                            maxLength: 25,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Card',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            labelWidth: 30,
                                            width: 185,
                                            layout: 'hbox',
                                            margin: '0 5 0 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-filterScardn1ARC',
                                                    emptyText: '6 DIGITS',
                                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                                    width: 70,
                                                    margin: '0 5 0 0',
                                                    maxLength: 6,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'eventKey'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-filterScardn2ARC',
                                                    emptyText: '4 DIGITS',
                                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                                    width: 60,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'eventKey'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-filterSauthocARC',
                                            fieldLabel: 'Authorization',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            labelWidth: 78,
                                            width: 150,
                                            margin: '0 10 0 0',
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbF1',
                                            fieldLabel: 'Status F1',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"],
                                                    ["Y", "Yes"],
                                                    ["N", "No"]
                                                ]
                                            }),
                                            width: 150,
                                            labelWidth: 55,
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
                                            id: prototype.id + '-cmbF2',
                                            fieldLabel: 'Status F2',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"],
                                                    ["Y", "Yes"],
                                                    ["N", "No"]
                                                ]
                                            }),
                                            width: 150,
                                            labelWidth: 55,
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
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleAditionalSetARC',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL</span>',
                            width: 620,
                            hidden: true,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [

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



