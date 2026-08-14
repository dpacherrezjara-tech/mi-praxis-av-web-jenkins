Ext.define('Ext.Praxis.view.payments.CargoGuideForm.Filters', {
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
                            title: '<span style="color:#1A4D8F;font-weight:bold;">ADATE</span>',
                            width: 540,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 140,
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
                                            {code: 'S', name: 'Adate'},
                                            {code: 'U', name: 'Payday'}
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
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            id: prototype.id + '-titleAditionalSetBSP',
                            title: '<span style="color:#1A4D8F;font-weight:bold;">ADITIONAL</span>',
                            width: 900,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
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
                                    id: prototype.id + '-cmbCurrencies',
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
                                    width: 219,
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
                                    id: prototype.id + '-txtBandoc',
                                    fieldLabel: 'BANDOC',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelAlign: 'left',
                                    width: 170,
                                    labelWidth: 60,
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        specialkey: 'eventKey'
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    id: prototype.id + '-txtMonto',
                                    fieldLabel: 'Amount',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelAlign: 'left',
                                    width: 170,
                                    labelWidth: 55,
                                    hideTrigger: true,
                                    decimalPrecision: 2,
                                    allowDecimals: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        specialkey: 'eventKey'
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMPF291',
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
                            title: '<span style="color:#1A4D8F;font-weight:bold;">MPF291 FILTERS</span>',
                            width: 560,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSFileMPF291',
                                    fieldLabel: 'SFILE',
                                    labelAlign: 'left',
                                    width: 260,
                                    labelWidth: 40,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    maxLength: 100,
                                    enforceMaxLength: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        specialkey: 'eventKey'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatusMPF291',
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
                                    width: 200,
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
                    id: prototype.id + '-panelDashboard',
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
                            id: prototype.id + '-titleFieldsetDashboard',
                            width: 1430,
                            title: '<span style="color:#1A4D8F;font-weight:bold;">FILTERS</span>',
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: { type: 'vbox', align: 'left' },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: { type: 'hbox', align: 'middle' },
                                    margin: '0 0 4 0',
                                    items: [
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    width: 185,
                                    labelWidth: 60,
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbInputDateDashboard',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: 'S',
                                    disabled: true,
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'S', name: 'Payment Date'}
                                        ]
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYearDashboard',
                                    fieldStyle: 'text-align: left;',
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
                                    listeners: {
                                        select: function (cmb, records) {
                                            Ext.getCmp(prototype.id + '-cmbDateToYearDashboard').setValue(cmb.getValue());
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonthDashboard',
                                    fieldStyle: 'text-align: left;',
                                    editable: false,
                                    fieldLabel: '',
                                    width: 48,
                                    labelWidth: 0,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        select: function (cmb, records) {
                                            Ext.getCmp(prototype.id + '-cmbDateToMonthDashboard').setValue(cmb.getValue());
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDayDashboard',
                                    fieldStyle: 'text-align: left;',
                                    editable: false,
                                    autoSelect: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 43,
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        select: function (cmb, records) {
                                            Ext.getCmp(prototype.id + '-cmbDateToDayDashboard').setValue(cmb.getValue());
                                        }
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYearDashboard',
                                    fieldStyle: 'text-align: left;',
                                    editable: false,
                                    fieldLabel: 'To',
                                    width: 80,
                                    labelWidth: 20,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70}
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonthDashboard',
                                    fieldStyle: 'text-align: left;',
                                    editable: false,
                                    fieldLabel: '',
                                    width: 48,
                                    labelWidth: 0,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70}
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDayDashboard',
                                    fieldStyle: 'text-align: left;',
                                    editable: false,
                                    autoSelect: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 43,
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    margin: '0 15 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCustomerDashboard',
                                    fieldLabel: 'Customer',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    triggerAction: 'all',
                                    labelWidth: 58,
                                    width: 175,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '729',
                                    disabled: true,
                                    listConfig: {maxHeight: 130},
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '',    name: 'All'},
                                            {code: '133', name: 'LACSA'},
                                            {code: '134', name: 'AVIANCA'},
                                            {code: '202', name: 'TACA'},
                                            {code: '547', name: 'AEROGAL'},
                                            {code: '729', name: 'TAMPA'}
                                        ]
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCountryDashboard',
                                    fieldLabel: 'Country',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    editable: true,
                                    labelWidth: 45,
                                    width: 219,
                                    typeAhead: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    listConfig: {maxHeight: 111},
                                    triggerAction: 'all',
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTypeDocDashboard',
                                    fieldLabel: 'Type Doc',
                                    hidden: true,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    triggerAction: 'all',
                                    labelWidth: 55,
                                    width: 175,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: 'S',
                                    listConfig: {maxHeight: 80},
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'S', name: 'Settlement'},
                                            {code: 'T', name: 'Sales'}
                                        ]
                                    },
                                    margin: '0 10 0 0',
                                    listeners: {
                                        select: function (cmb) {
                                            var isSale = cmb.getValue() === 'T';
                                            Ext.getCmp(prototype.id + '-txtSFileDashboard').setVisible(isSale);
                                            if (!isSale) {
                                                Ext.getCmp(prototype.id + '-txtSFileDashboard').setValue('');
                                            }
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: { type: 'hbox', align: 'middle' },
                                    padding: '0 10 0 10',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Dashboard',
                                            margin: '0 5 0 0',
                                            width: 65,
                                            id: prototype.id + '-lblDashboardToggle'
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitchDashboard',
                                            margin: '0 5 0 0',
                                            html: `<style>
                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                .toggle-input{opacity:0;width:0;height:0;}
                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                            </style>
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input" id="toggleDashboard"><span class="toggle-slider"></span></label>`,
                                            listeners: {
                                                afterrender: function (cmp) {
                                                    var el = document.getElementById('toggleDashboard');
                                                    if (el) {
                                                        el.addEventListener('change', function () {
                                                            var isDetail = el.checked;
                                                            var row2 = Ext.getCmp(prototype.id + '-panelDashboardDetailFilters');
                                                            row2.setVisible(isDetail);
                                                            Ext.getCmp(prototype.id + '-cmbTypeDocDashboard').setVisible(isDetail);
                                                            Ext.getCmp(prototype.id + '-cmbInputDateDashboard').setDisabled(!isDetail);
                                                            if (!isDetail) {
                                                                Ext.getCmp(prototype.id + '-cmbTypeDocDashboard').setValue('S');
                                                                Ext.getCmp(prototype.id + '-cmbStatusDashboard').setValue('');
                                                                Ext.getCmp(prototype.id + '-cmbCurrencyDashboard').setValue('');
                                                                Ext.getCmp(prototype.id + '-cmbInputDateDashboard').setDisabled(true);
                                                                Ext.getCmp(prototype.id + '-txtSFileDashboard').setValue('');
                                                                Ext.getCmp(prototype.id + '-txtSFileDashboard').setVisible(false);
                                                            }
                                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');
                                                        });
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Detail',
                                            margin: '0 0 0 5',
                                            width: 40,
                                            id: prototype.id + '-lblDetailToggle'
                                        }
                                    ]
                                }
                                ]   // end fila 1 container items
                            },    // end fila 1 container
                            {
                                xtype: 'container',
                                id: prototype.id + '-panelDashboardDetailFilters',
                                hidden: true,
                                layout: { type: 'hbox', align: 'middle' },
                                margin: '6 0 0 0',
                                items: [
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-cmbCurrencyDashboard',
                                        fieldLabel: 'Currency',
                                        labelStyle: 'text-align: left; font-size: 12px;',
                                        fieldStyle: 'text-align: center; font-size: 12px;',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        selectOnFocus: true,
                                        editable: true,
                                        labelWidth: 50,
                                        width: 200,
                                        typeAhead: true,
                                        valueField: 'A005KEY',
                                        displayField: 'A005KEY2',
                                        listConfig: {maxHeight: 111},
                                        triggerAction: 'all',
                                        margin: '0 10 0 0'
                                    },
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-cmbStatusDashboard',
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
                                        width: 230,
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
                                        id: prototype.id + '-txtSFileDashboard',
                                        hidden: true,
                                        fieldLabel: 'SFILE',
                                        labelAlign: 'left',
                                        width: 260,
                                        labelWidth: 35,
                                        labelStyle: 'text-align: left; font-size: 12px;',
                                        fieldStyle: 'text-align: center; font-size: 12px;',
                                        maxLength: 80,
                                        enforceMaxLength: true,
                                        margin: '0 10 0 0'
                                    }
                                ]
                            }
                            ]   // end fieldset items
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
                            width: 530,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTicket',
                                    fieldLabel: 'N° Ticket / Guia',
                                    labelAlign: 'left',
                                    width: 240,
                                    labelWidth: 90,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    allowBlank: false,
                                    maxLength: 50,
                                    enforceMaxLength: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        specialkey: 'eventKey'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNumFacARC',
                                    fieldLabel: 'N° Factura Legal',
                                    labelAlign: 'left',
                                    width: 240,
                                    labelWidth: 95,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    maxLength: 50,
                                    enforceMaxLength: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        specialkey: 'eventKey'
                                    }
                                },
                                {
                                    fieldLabel: 'Search By',
                                    labelAlign: 'left',
                                    hidden: true,
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
                                    hidden: true,
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
                                    hidden: true,
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
                                    hidden: true,
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
                                    hidden: true,
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
                                    hidden: true,
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
                                    hidden: true,
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
                            hidden: true,
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



