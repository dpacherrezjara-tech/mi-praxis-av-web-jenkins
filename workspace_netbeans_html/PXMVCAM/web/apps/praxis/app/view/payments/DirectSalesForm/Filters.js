Ext.define('Ext.Praxis.view.payments.DirectSalesForm.Filters', {
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
                            width: 1470,
                            style: 'border: 1px solid #1A4D8F; padding: 8px; margin: 5px;',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
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
                                    value: 'A',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'S', name: 'Sales Date'},
                                            {code: 'A', name: 'Abono Date'}
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
                                    maskRe: /[0-9]/
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
                                    enforceMaxLength: true
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
                                            {code: '729', name: 'TAMPA'},
                                            {code: '133', name: 'LACSA'},
                                            {code: '134', name: 'AVIANCA'},
                                            {code: '202', name: 'TACA'},
                                            {code: '547', name: 'AEROGAL'},
                                            {code: '', name: 'All'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
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
                                    allowBlank: true,
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
                                        change: 'btnSearch_click'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAgent',
                                    fieldLabel: 'Agent',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelWidth: 40,
                                    labelAlign: 'left',
                                    width: 120,
                                    maxLength: 10,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'eventKey'
                                    }
                                },
                                {
                                    // Solo Detail (igual que Status): el combo se llena en
                                    // obtainData() con me.lstCurrencies, igual que cmbCountry.
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCurrency',
                                    hidden: true,
                                    fieldLabel: 'Currency',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelWidth: 55,
                                    labelAlign: 'left',
                                    width: 160,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2',
                                    triggerAction: 'all',
                                    value: '',
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
                                            id: prototype.id + '-dashboardDS'
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitchDashboardDetail',
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
                                            id: prototype.id + '-detailDS'
                                        },
                                    ]
                                },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    margin: '8 0 0 0',
                                    layout: 'hbox',
                                    items: [
                                {
                                    // Solo lo usa la vista Detail (MPS775): el Dashboard (MPS774)
                                    // ya desglosa por estado en columnas, así que se oculta en
                                    // Dashboard y solo se muestra al pasar a Detail (ver
                                    // showFiltersDashboardDetail/syncToggleSwitch en el controller).
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbStatus',
                                    hidden: true,
                                    fieldLabel: 'Status',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    labelWidth: 45,
                                    labelAlign: 'left',
                                    width: 150,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    triggerAction: 'all',
                                    value: '',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '', name: 'All'},
                                            {code: '1', name: 'Match'},
                                            {code: '5', name: 'Match Manual'},
                                            {code: '3', name: 'Pending'}
                                        ]
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    // Solo Detail. Se envía como texto (no numérico) para poder
                                    // mandar el signo tal cual si el monto es negativo.
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNeto',
                                    hidden: true,
                                    fieldLabel: 'Neto',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: right; font-size: 12px;',
                                    labelWidth: 35,
                                    labelAlign: 'left',
                                    width: 110,
                                    maskRe: /[0-9.\-]/,
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'eventKey'
                                    }
                                },
                                {
                                    // Solo Detail. Mismo criterio que Neto: texto, permite signo.
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPayamou',
                                    hidden: true,
                                    fieldLabel: 'Payamou',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: right; font-size: 12px;',
                                    labelWidth: 55,
                                    labelAlign: 'left',
                                    width: 110,
                                    maskRe: /[0-9.\-]/,
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    margin: '0 10 0 0',
                                    listeners: {
                                        keypress: 'eventKey'
                                    }
                                },
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});
