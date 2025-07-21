Ext.define('Ext.Praxis.view.payments.BankStatementExtractForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'fit', // <--- el layout general puede ser fit o lo que desees

    items: [
        {
            xtype: 'container',
            id: prototype.id + '-filterMain',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            style: 'padding: 10px 0 10px 15px;',
            items: [
                // Avianca Group
                {
                    fieldLabel: 'Avianca Group',
                    xtype: 'combo',
                    width: 200,
                    labelWidth: 95,
                    style: 'margin-right:10px;',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                // Type Visualization
                {
                    fieldLabel: 'Type Visualization',
                    xtype: 'combo',
                    width: 220,
                    labelWidth: 115,
                    style: 'margin-right:10px;',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                {
                    fieldLabel: 'STATE',
                    xtype: 'combo',
                    width: 220,
                    labelWidth: 60,
                    style: 'margin-right:10px;',
                    hidden: true,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    id: prototype.id + '-typeState',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 60},
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    value: '',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '', name: 'ALL'},
                            {code: '0', name: 'OK'},
                            {code: '1', name: 'ERROR'},
                        ]
                    },
                    listeners: {
                        change: ''
                    }
                },
                {
                    fieldLabel: 'Processor',
                    xtype: 'combo',
                    width: 200,
                    labelWidth: 95,
                    style: 'margin-right:10px;',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    id: prototype.id + '-fieldProcessorLog',
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
                            {code: 'AX', name: 'AX'},
                            {code: 'DS', name: 'DS'},
                            {code: 'WP', name: 'WP'},
                            {code: 'WQ', name: 'WQ'}
                        ]
                    },
                    listeners: {
                        change: ''
                    }
                },
                // Type Report
                {
                    fieldLabel: 'Type Report',
                    xtype: 'combo',
                    width: 170,
                    labelWidth: 80,
                    style: 'margin-right:10px;',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                // From Year
                {
                    fieldLabel: 'From',
                    xtype: 'combo',
                    width: 105,
                    labelWidth: 40,
                    style: 'margin-right:3px;',
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-cmbDateFromYear',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    anchor: '100%'
                },
                // From Month
                {
                    xtype: 'combo',
                    width: 55,
                    style: 'margin-right:3px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateFromMonth',
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
                    anchor: '100%'
                },
                // From Day
                {
                    xtype: 'combo',
                    width: 50,
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateFromDay',
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
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                // To Year
                {
                    fieldLabel: 'To',
                    xtype: 'combo',
                    width: 85,
                    labelWidth: 20,
                    style: 'margin-right:3px;',
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-cmbDateToYear',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    anchor: '100%'
                },
                // To Month
                {
                    xtype: 'combo',
                    width: 55,
                    style: 'margin-right:3px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateToMonth',
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
                    anchor: '100%'
                },
                // To Day
                {
                    xtype: 'combo',
                    width: 50,
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateToDay',
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
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                // Historic / Current RadioGroup
                {
                    xtype: 'radiogroup',
                    width: 170,
                    style: 'margin-right:10px;',
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
                },
                // Detail / Main RadioGroup
                {
                    xtype: 'radiogroup',
                    width: 170,
                    id: prototype.id + '-rbtDetail',
                    fieldLabel: '',
                    horizontal: true,
                    hidden: false,
                    items: [
                        {boxLabel: '<strong>Detail</strong>', name: 'rbD', inputValue: 'rbtDetail1', width: 80},
                        {boxLabel: '<strong>Main</strong>', name: 'rbD', inputValue: 'rbtDetail2', width: 80, checked: true}
                    ],
                    listeners: {
                        change: 'onChangeRadio'
                    }
                },
                    {
                        xtype: 'checkbox',
                        boxLabel: '<strong>Log</strong>',
                        id: prototype.id + '-chkLog',
                        inputValue: '1',
                        uncheckedValue: '0',
                        listeners: {
                            change: 'executeLog',
                        }
},
                {
                    xtype: 'button',
                    text: 'Buscar',
                    id: prototype.id + '-buttonLog',
                    style: 'margin-left:10px; font-size: 14px;',
                    scale: 'medium',
                    hidden: true,
                    click: 'executeLogSearch',
                    
                }
            ]
        },
        
        
    ]
});
