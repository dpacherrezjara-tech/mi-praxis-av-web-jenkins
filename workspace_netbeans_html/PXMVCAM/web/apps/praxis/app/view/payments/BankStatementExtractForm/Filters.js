Ext.define('Ext.Praxis.view.payments.BankStatementExtractForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'vbox',
    defaults: {
        width: '100%'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox', // Primera fila de filtros
            padding: '10px 15px',
            items: [
                {
                    fieldLabel: 'Avianca Group',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 95,
                    xtype: 'combo',
                    disabled: true,
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
                            {code: '547', name: 'AEROGAL'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    fieldLabel: 'Type Visualization',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 220,
                    labelWidth: 115,
                    xtype: 'combo',
                    disabled: false,
                    id: prototype.id + '-typeVisualization',
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
                    value: 'USA',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: 'USA', name: 'USAFLOW'},
                            {code: 'TACA', name: 'TACAFLOW'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    fieldLabel: 'Type Report',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 170,
                    labelWidth: 80,
                    xtype: 'combo',
                    disabled: false,
                    id: prototype.id + '-typeReport',
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
                    value: 'D',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: 'D', name: 'DIARY'},
                            {code: 'W', name: 'WEEKLY'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 40,
                    width: 105,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                    width: 55,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
                    fieldStyle: 'text-align: left;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                    width: 50,
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 20,
                    width: 85,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                    width: 55,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    fieldStyle: 'text-align: left;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                    width: 50,
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    fieldLabel: 'Processor',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 220,
                    labelWidth: 68,
                    emptyText: 'All',
                    value: [],
                    hidden: true,
                    displayField: 'NAME',
                    valueField: 'VALUE',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true,
                    forceSelection: true
                },
                {
                    fieldLabel: 'Number Account',
                    hidden: true,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 110,
                    xtype: 'combo',
                    id: prototype.id + '-numberAccount',
                    queryMode: 'local',
                    allowBlank: false,
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
                    value: '109003',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '', name: 'All'},
                            {code: '109003', name: '109003'},
                            {code: '109004', name: '109004'},
                            {code: '109002', name: '109002'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {
                    fieldLabel: 'Type Document',
                    hidden: true,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 106,
                    xtype: 'combo',
                    id: prototype.id + '-typeDocument',
                    queryMode: 'local',
                    allowBlank: false,
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
                            {code: 'D', name: 'Debits'},
                            {code: 'R', name: 'Refund'},
                            {code: 'S', name: 'Sale'},
                            {code: 'V', name: '-'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height: 10},
                {
                    xtype: 'radiogroup',
                    id: prototype.id + '-rbChart_IA',
                    fieldLabel: '',
                    horizontal: true,
                    hidden: false,
                    items: [
                        {boxLabel: '<strong>Historic</strong>', name: 'rb', inputValue: 'rbc1_IA', width: 80},
                        {boxLabel: '<strong>Current</strong>', name: 'rb', inputValue: 'rbc2_IA', width: 80, checked: true}
                    ],
                    listeners: {
                        change: 'onChangeRadio'
                    }
                }
                //</editor-fold>
            ]
        }
    ]
});
