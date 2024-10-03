Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-filterMain_1',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            margin: '0 0 0 30px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 5px',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateSel',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    fieldStyle: 'text-align: left;',
                    width: 110,
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
//                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateDay',
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
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
//                {xtype: 'tbspacer', width: 10},
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
                {
                    xtype: 'label',
                    text: 'Country:',
                    padding: '8 0 0 30 ',
                    width: 90
                },
                
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 219,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {
                    xtype: 'label',
                    text: 'Processor:',
                    padding: '8 0 0 30 ',
                    width: 90,
//                    hidden:true
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    queryMode: 'local',
                    allowBlank: false,
//                    hidden: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 219,
                    typeAhead: true,
                    valueField: 'VALUE',
                    displayField: 'NAME',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merchant Number:',
                    id: prototype.id + '-txtLiquida',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 20,
                    hidden: true,
                    labelWidth: 150,
                    width: 300,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                
            ]
        },
        {
            xtype: 'form',
            border: false,
            id: prototype.id + '-filterMain_2',
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 30px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Code Bank',
                    id: prototype.id + '-cmbBank',
                    queryMode: 'local',
                    margin: '0 0 0 10',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    fieldStyle: 'text-align: left;',
                    width: 295,
                    labelWidth: 85,
                    labelAlign: 'left'
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Account',
                    id: prototype.id + '-cmbEFTE',
                    queryMode: 'local',
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    margin: '0 0 0 20',
                    fieldStyle: 'text-align: left;',
                    labelWidth: 60,
                    width: 276,
                    labelAlign: 'left'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Transaction',
                    id: prototype.id + '-cmbTTRAN',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    margin: '0 0 0 30',
                    labelWidth: 100,
                    width: 251,
                    labelAlign: 'left'
                },
                {
                    xtype: 'label',
                    text: 'Doc Sap Bank:',
                    padding: '3 0 0 30',
                    width: 120,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtBANDOC',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 10,
                    width: 90,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey_BANDOC'
                    }
                },
                
                
                
            ]
        },
        {
            xtype: 'form',
            border: false,
            id: prototype.id + '-filterMain_3',
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 20px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Doc. Type:',
                    padding: '3 0 0 5',
                    width: 80,
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbTDOC',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'value',
                    displayField: 'description',
                    fieldStyle: 'text-align: left;',
                    width: 75,
                    hidden: false,
                    value: '',
                     store: {
                        fields: ['value', 'description'],
                        data: [
                            { value: '', description: 'All'},
                            { value: 'S', description: 'Sales' },
                            { value: 'D', description: 'Debits' }
                        ]
                    }
                },
                {
                    xtype: 'label',
                    text: 'Status:',
                    padding: '3 30 0 30',
                    hidden: false,
                    width: 80,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Status'
                    }
                },
                {
                    xtype:'combo',
                    id: prototype.id+'-cmbStatus',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["", "All"], ["1", "Match"], ["3", "Statement w/o Settlement"], ["5", "Match Manual"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 100,
                    value: "",
                    hidden: false,
                    typeAhead: true,
                    valueField: 'value', displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners:{
                    }
                },
                 {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'radiogroup',
                    hidden: true,
//                    fieldLabel: 'Transaction',
//                    margin: '0px 5px 0px 10px',
                    id: prototype.id + '-rbgType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Doc Sap   </strong>', name: 'rb', inputValue: 'rbDOCS', width: 80, checked: true},
                        {boxLabel: '<strong style="color:#148D28" >Taca Flown </strong>', name: 'rb', inputValue: 'rbTACA', width: 90}
                    ],
                    listeners: {
                        change: 'searchTRANSA_clickHandler'
                    }
                },
//                 {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'form',
                    id: prototype.id + '-formLIQvsEC',
                    border: false,
                    padding: '0 0 0 25',
                    bodyStyle: 'background-color: #E3EAF9;',
//                                  layout: 'vbox',
                    items: [{

                            xtype: 'filefield',
                            id: prototype.id + '-file',
                            name: 'excelfile',
//                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update Excel</strong>',
                            allowBlank: true,
                            accept: '.xlsx, .xls',
                            labelWidth: 85,
                            width: 280,
                            buttonAlign: 'left', 
                            buttonText: 'Select excel...',
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text: '<strong>Select</strong>',
                                width: 80,
                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                            },
                            listeners: {
                                //change: 'onUploadChange'
                            }
                        }]
                },
//                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'button',
                    id: prototype.id + '-btn_Concilia_LIQvsEC',
                    margin: '1 0 0 5',
                    html: '<strong style="color:white;">Conciliar</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
//                                  icon: 'resources/img/botones/process_load.png',
                    //disabled: true,
                    border: false,
                    listeners: {
                        click: 'onLoadClick_conciliaEC'
                    }
                },
                
            ]
        },
        ,
        {
            xtype: 'form',
            border: false,
            id: prototype.id + '-filterMain_4',
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 0px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                
                    
                    {
                        xtype: 'label',
                        text: 'Colombia',
                        margin: '3 0 0 3',
                        id: prototype.id + '-COL',
                        width: 60
                    },
                    {
                        xtype: 'component',
                        id: prototype.id + '-btnToggleSwitchFT',
                        margin: '3 0 0 3',
                        html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modo Alternancia</title><style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body><label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                        tooltip: 'Export to Report',
                        listeners: {
                            change: 'chgBash',
                            click: 'clickToggleSwitch'
                        }
                    },
                    {
                        xtype: 'label',
                        text: 'Exterior',
                        margin: '3 0 0 13',
                        id: prototype.id + '-EXT',
                        width: 60
                    },
                    {
                        xtype: 'label',
                        text: ' ',
                        margin: '13 0 0 10',
                        id: prototype.id + '-TEST',
                        hidden: true,
                        width: 1
                    },
                
            ]
        }

    ]
});
