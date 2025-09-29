Ext.define('Ext.Praxis.view.interline.ValidationInterfacesForm.Filters', {
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
                    fieldLabel: 'Information',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 80,
                    xtype: 'combo', 
                    id: prototype.id + '-typeGrid',
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
                    value: '1',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '1', name: 'VALIDATION'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20},
                //<editor-fold defaultstate="collapsed" desc="filtersValidation">
                {
                    fieldLabel: 'Avianca Group',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 95,
                    xtype: 'combo', 
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
//                {xtype: 'tbspacer', width: 15, height:20},
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Extraction Date',
//                    id: prototype.id + '-extractionDate',
//                    editable: true,
//                    readOnly: false,
//                    enforceMaxLength: true,
//                    maxLength: 8,
//                    maskRe: /[0-9/]/,
//                    labelWidth: 100,
//                    labelStyle: 'text-align: left; font-size: 14px;',
//                    fieldStyle: 'text-align: left; font-size: 14px;',
//                    width: 190
//                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacer1'},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYearVa',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    fieldLabel: 'Posting Date',
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
                    labelWidth: 100,
                    width: 170,
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
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacer2'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Interface',
                    id: prototype.id + '-interface',
                    editable: true,
                    readOnly: false,
                    enforceMaxLength: true,
                    maxLength: 20,
                    labelWidth: 61,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 230
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacer3'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Referencia',
                    id: prototype.id + '-referencia',
                    editable: true,
                    readOnly: false,
                    enforceMaxLength: true,
                    maxLength: 40,
                    labelWidth: 70,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 230
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="filtersBankReconciliation">
                {
                    xtype: 'combo',
                    fieldLabel: 'Search By',
                    id: prototype.id + '-cmbFecFiltro',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 190,
                    labelWidth: 68,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {minWidth: 130},
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB1'},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'From',
                    width: 105,
                    labelWidth: 38,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
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
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 55,
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
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateDay',
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    disabled: true,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 50,
                    anchor: '100%',
                    listener: {
                        change: 'onDateFromDaySelect',
                        expand: 'eventSelectFromDay'

                    }
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB2'},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'To',
                    width: 90,
                    labelWidth: 23,
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
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 55,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code', displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    disabled: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 50,
                    anchor: '100%',
                    listener: {
                        change: 'onDateToDaySelect',
                        expand: 'eventSelectToDay'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB3'},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    fieldLabel: 'Country',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    labelWidth: 55,
                    width: 219,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB4'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Card Number',
                    id: prototype.id + '-txtCard1',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 6,
                    width: 150,
                    labelWidth: 88,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'tarjeta_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB5'},
                {
                    xtype: 'textfield',
                    fieldLabel: "*****<span style='color:red'>(*)</span>",
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-txtCard2',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 4,
                    width: 110,
                    labelWidth: 64,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB6'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Author. Cod',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-txtAUTHOC',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 8,
                    width: 160,
                    labelWidth: 78,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20, id: prototype.id + '-spacerB7'},
                {
                    xtype: 'combo',
                    fieldLabel: 'Business',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-cmbNEGOC',
                    width: 150,
                    labelWidth: 60,
                    emptyText: 'All',
                    value: '',  
                    displayField: 'name',
                    valueField: 'code',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true, 
                    forceSelection: true ,
                },
                //</editor-fold>
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox', // Primera fila de filtros
            padding: '0px 15px 10px 15px',
            id: prototype.id + '-FilterB',
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbTDOC',
                    fieldLabel: 'Doc. Type',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    store: {
                        fields: ['value', 'name'],
                        data: [
                            { value: 'S', name: 'Sales' },
                            { value: 'D', name: 'Debito' },
                            { value: 'R', name: 'Refund' },
                            { value: 'C', name: 'Chargbck' },
                            { value: 'A', name: 'Acredit' }
                        ]
                    },
                    width: 160,
                    labelWidth: 68,
                    emptyText: 'All',
                    value: 'S',  
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true, 
                    forceSelection: true 
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    fieldLabel: 'Processor',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 180,
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
                    xtype: 'textfield',
                    id: prototype.id + '-txtAGENCY',
                    fieldLabel: 'Agent',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 8,
                    width: 125,
                    labelWidth: 44,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarSAGENT_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
                    fieldLabel: 'Status',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Status'
                    },
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                           ["1", "Match"], ["3", "Settlement Without Sales"], ["5", "Match Manual"]
                        ]
                    }),
                    width: 170,
                    labelWidth: 44,
                    emptyText: 'All',
                    value: ["1", "Match"],  
                    displayField: 'description',
                    valueField: 'value',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true, 
                    forceSelection: true
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAMOUNT',
                    fieldLabel: 'Amount',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9.]/, // Permitir solo números y el punto decimal
                    maxLength: 20,
                    hidden: false,
                    width: 220,
                    labelWidth: 55,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function (field) {
                            var value = field.getValue().replace(/[^\d.]/g, '');
                            var parts = value.split('.');
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            if (parts[1] && parts[1].length > 2) {
                                parts[1] = parts[1].substring(0, 2);
                            }
                            field.setValue(parts.join('.'));
                        },
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSource',
                    fieldLabel: 'Source',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["A", "ARC"], ["B", "BSP"], ["S", "ASR"], ["T", "TC"]
                        ]
                    }),
                    width: 170,
                    labelWidth: 50,
                    emptyText: 'All',
                    value: '',  
                    displayField: 'name',
                    valueField: 'code',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    multiSelect: true, 
                    forceSelection: true 
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOMENTF',
                    style: 'font-weight:bold;color:#0B333C;',
                    fieldLabel: 'BPO Comment',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODE',
                    displayField: 'NAME',
                    value: '',
                    width: 270,
                    labelWidth: 98,
                    hidden: false,
                    hiddenLabel: false
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtBANDOC',
                    fieldLabel: 'Doc Sap Bank',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 10,
                    width: 195,
                    labelWidth: 93,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey_BANDOC'
                    }
                }
            ]
        }
    ]
});
