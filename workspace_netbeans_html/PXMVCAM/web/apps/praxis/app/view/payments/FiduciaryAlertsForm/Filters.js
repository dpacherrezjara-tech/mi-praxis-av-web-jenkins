Ext.define('Ext.Praxis.view.payments.FiduciaryAlertsForm.Filters', {
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
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    fieldLabel: 'Processor',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 220,
                    labelWidth: 68,
                    emptyText: 'All',
                    value: [],  
                    displayField: 'NAME',
                    valueField: 'VALUE',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true, 
                    forceSelection: true
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    fieldLabel: 'Number Account',
                    hidden: false,
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
                            {code: '109003', name: '109003'},
                            {code: '109004', name: '109004'},
                            {code: '109002', name: '109002'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYearVa',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    fieldLabel: 'Sale Date',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable:false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 70,
                    width: 135,
                    anchor: '100%'                    
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonthVa',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
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
                    id: prototype.id+'-cmbDateFromDayVa',
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
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    fieldLabel: 'Type Document',
                    hidden: false,
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
                }
                //</editor-fold>
            ]
        }
    ]
});
