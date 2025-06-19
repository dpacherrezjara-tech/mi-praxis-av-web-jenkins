Ext.define('Ext.Praxis.view.payments.TourismConciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {   
            xtype: 'form',
            id: prototype.id + '-contFilter',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            hidden: true,
            defaults:  {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Sale Date</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 10px',
                    hidden: false
                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromYear',
//                    fieldLabel: 'From',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    editable: false,
//                    triggerAction: 'all',
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    hidden: false,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 50,
//                    width: 140,
//                    anchor: '100%'
//                },
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 120,
                            labelWidth: 45,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
//                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            listeners: {
                                change: 'cbxDateFromYear_changeHandler'
                            }
                        },
                        
                        {xtype: 'tbspacer', width: 10},
                
                
                
                
                
                
                
                
                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromMonth',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    hidden: false,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    width: 70,
//                    anchor: '100%'
//                },
                
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true,
                            listeners: {
                                change: 'cbxDateFromMonth_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        
                        
                        
                
                
                
                
                
                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromDay',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: true,
//                    enableKeyEvents: true,
//                    forceSelection: true,
//                    caseSensitive: false,
//                    valueField: 'code', displayField: 'name',
//                    emptyText: 'All',
//                    width: 60,
//                    typeAhead: true,                            
//                    listeners: {
//                        change: 'onFromDayChange',                                
//                        keypress: 'onTextKeypress'
//                    }
//                },
//                
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            disabled: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
//                            hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%',
                            listener: {
                                change: 'onDateFromDaySelect',
                                expand: 'eventSelectFromDay'

                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                
                
                
                
                
                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToYear',
//                    fieldLabel: 'To',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    editable: false,
//                    triggerAction: 'all',
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    hidden: false,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 50,
//                    width: 140,
//                    anchor: '100%'
//                },
                
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 106,
                            labelWidth: 31,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {xtype: 'tbspacer', width: 10},
                
                
                
                
                
                
                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToMonth',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    hidden: false,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    width: 70,
//                    anchor: '100%'
//                },
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
//                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {xtype: 'tbspacer', width: 10},
                
                
                
                
                
                
//                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToDay',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: true,
//                    enableKeyEvents: true,
//                    forceSelection: true,
//                    caseSensitive: false,
//                    valueField: 'code', displayField: 'name',
//                    emptyText: 'All',
//                    width: 60,
//                    typeAhead: true,
//                    listeners: {
//                        change: 'onToDayChange',
//                        keypress: 'onTextKeypress'
//                    }
//                },
                
                
                
                
                
                                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            disabled: true,
//                            hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%',
                            listener: {
                                change: 'onDateToDaySelect',
                                expand: 'eventSelectToDay'
                            }
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 30},
                
                
                
                
                
                
                
                
//                {
//                    xtype: 'combo',
//                    fieldLabel: 'Periodo',
//                    id: prototype.id+'-cmbPERNUM',
//                    queryMode: 'local',
//                    editable: true,
//                    selectOnFocus: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    labelWidth: 110,
//                    width: 170,
//                    listConfig: {minWidth: 20},
//                },
//                {
//                    xtype: 'combo',
//                    fieldLabel: 'Processing Ind',
//                    id: prototype.id+'-cmbPROCIND',
//                    queryMode: 'local',
//                    editable: true,
//                    selectOnFocus: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    labelWidth: 170,
//                    width: 230,
//                    listConfig: {minWidth: 170},
//                },
//                {
//                    xtype: 'combo',
//                    fieldLabel: 'Credit Card Code',
//                    id: prototype.id+'-cmbCode',   
//                    queryMode: 'local',
//                    valueField: 'CODE',
//                    displayField: 'NAME',
//                    width: 300,
//                    labelWidth: 170,
//                    selectOnFocus: true,
//                    fieldStyle: 'text-align: left;',
//                    listConfig: {minWidth: 170}
//                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Agente:',
                    id: prototype.id+'-txtAGENTE',                                   
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength:8,
                    labelWidth: 120,
                    width: 230,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    },
                    margin: '0 0 0 78'
                },
                
                
                
                                {
                    xtype: 'label',
                    text: 'Status :',
                    padding: '3 0',
                    hidden: false,
                    width: 64,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Status'
                    },
                    margin: '0 0 0 78'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
//                            fieldLabel: 'Doc',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["", "All"],["72", "Match"], ["73", "Surpluses"], ["74", "Shortages"]
                        ]
                    }),
                    width: 100,
                    emptyText: 'All',
                    value: '',
                    displayField: 'description',
                    valueField: 'value',
                    queryMode: 'local',
//                    filterPickList: true,
                    editable: true,
//                    multiSelect: true,
                    forceSelection: true,

                },







            ]
        },
        
        
        
//        {   
//            xtype: 'form',
//            border: false,
//            bodyStyle: 'background: transparent',
//            margin: '10px 2px 10px 10px',
//            layout: 'column',
//            defaults:  {
////                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
//                anchor: '100%',
//                hiddenLabel: false,
//                labelAlign: 'right',
//                xtype: 'textfield',
//                hidden: false,
//                selectOnFocus: true
//            },
//            items: [ 
//                {
//                    xtype: 'label',
//                    html: '<strong style="color:#000;">Search by</strong>',
//                    align: 'left',
//                    fieldStyle: 'text-align: left;',
////                    padding: '8px 92px 0px 5px',
//                    hidden: false,
//                    margin: '4px 89px 4px 8px'
//                },
//                {
//                    xtype: 'combo',
////                    fieldLabel: '',
//                    id: prototype.id+'-cmbTRANSTYPE',
//                    queryMode: 'local',
//                    editable: false,
//                    selectOnFocus: false,
//                    valueField: 'code',
//                    displayField: 'name',
//                    width: 73
//                },
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Agente:',
//                    id: prototype.id+'-txtAGENTE',                                   
//                    maskRe: /[0-9]/,
//                    enforceMaxLength: true,
//                    maxLength:8,
//                    labelWidth: 120,
//                    width: 230,
//                    enableKeyEvents: true,
//                    listeners: {
//                        keypress: 'eventKey'
//                    },
//                    margin: '0 0 0 78'
//                },
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Sales Date:',
//                    id: prototype.id+'-txtDate',                                   
//                    allowBlank: true,
//                    maskRe: /[0-8]/,
//                    enforceMaxLength: true,
//                    maxLength:13,
//                    labelWidth: 145,
//                    width: 287,
//                    enableKeyEvents: true,    
//                    
//                },
//                {
//                    xtype: 'label',
//                    text: 'Status :',
//                    padding: '3 0',
//                    hidden: false,
//                    width: 64,
//                    autoEl: {
//                        tag: 'label',
//                        'data-qtip': 'Status'
//                    },
//                    margin: '0 0 0 78'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbStatus',
////                            fieldLabel: 'Doc',
//                    store: new Ext.data.SimpleStore({
//                        fields: ['value', 'description'],
//                        data: [
//                            ["", "All"],["72", "Match"], ["73", "Surpluses"], ["74", "Shortages"]
//                        ]
//                    }),
//                    width: 100,
//                    emptyText: 'All',
//                    value: '',
//                    displayField: 'description',
//                    valueField: 'value',
//                    queryMode: 'local',
////                    filterPickList: true,
//                    editable: true,
////                    multiSelect: true,
//                    forceSelection: true,
//
//                },
//            ]
//        } 

    ]
});
