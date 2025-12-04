Ext.create('Ext.Component', {
    renderTo: Ext.getBody(),
    html: '<style type="text/css">' +
            '.button-off {' +
            '  background-color: #f44336;' + // Red color for OFF
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '.button-on {' +
            '  background-color: #4CAF50;' + // Green color for ON
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '</style>'
});

Ext.define('Ext.Praxis.view.payments.SalesAgentControlForm.Filters', {
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
            margin: '8px 0 10px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    fieldLabel: 'Client',
                    xtype: 'combo',
                    width: 150,
                    labelWidth: 35,
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
                            {code: '', name: 'All'}
                        ]
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    disabled: false,
                    hidden: true,
                    editable: false,
                    fieldLabel: 'From',
                    width: 95,
                    labelWidth: 35,
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
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    disabled: false,
                     hidden: true,
                    editable: false,
                    fieldLabel: '',
                    width: 50,
                    labelWidth: 0,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true,
                    listeners: {
                        change: 'cbxDateFromMonth_changeHandler'
                    },
                    margin: '0 10 0 0' 
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listener: {
                        change: 'onDateFromDaySelect',
                        expand: 'eventSelectFromDay'
                    },
                    margin: '0 10 0 0' 
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                     hidden: true,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'To',
                    width: 80,
                    labelWidth: 20,
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
                    id: prototype.id + '-cmbDateToMonth',
                     hidden: true,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 50,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true,
                    margin: '0 10 0 0' 
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                     hidden: true,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listener: {
                        change: 'onDateToDaySelect',
                        expand: 'eventSelectToDay'
                    },
                    margin: '0 10 0 0' 
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    fieldLabel: 'Country',
                    queryMode: 'local',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
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
                     margin: '0 10 0 0'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSourceAgent',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    fieldLabel: 'Source',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    labelWidth: 43,
                    width: 150,
                    value: '',
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    listConfig: {maxHeight: 111},
                    triggerAction: 'all',
                     margin: '0 10 0 0',
                      listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCanalAgent',
                    fieldLabel: 'Canal',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    labelWidth: 35,
                    width: 120,
                    value: '',
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
//                    listConfig: {maxHeight: 111},
                    triggerAction: 'all',
                     margin: '0 10 0 0',
                      listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbAcreditacionAgent',
                    fieldLabel: 'Accreditation',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    labelWidth: 75,
                    width: 170,
                    value: '',
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
//                    listConfig: {maxHeight: 111},
                    triggerAction: 'all',
                     margin: '0 10 0 0',
                      listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbRiesgoAgent',
                    fieldLabel: 'Risk',
                    queryMode: 'local',
                     labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    labelWidth: 30,
                    width: 200,
                    value: '',
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
//                    listConfig: {maxHeight: 111},
                    triggerAction: 'all',
                     margin: '0 10 0 0',
                      listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtINVOICE',
                    fieldLabel: 'Agent',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    labelWidth: 45,
                    enforceMaxLength: true,
                    hidden: false, 
                    maskRe: /[0-9]/,
                    maxLength: 8, 
                    width: 130,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keyup: 'onUpperValue',
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtProcess',
                    fieldLabel: 'Process Date',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    labelWidth: 75,
                    disabled: true,
                    enforceMaxLength: true,
                    hidden: false, 
                    maskRe: /[0-9]/,
                    maxLength: 8, 
                    width: 220,
                    enableKeyEvents: true,
                    margin: '0 10 0 0'
                },
                 {
                    xtype: 'panel',
                    layout: 'fit',
                    border: false,
                    hidden: true,
                     margin: '0 10 0 0',
                     id: prototype.id + '-panelRbtDetail',
                    background: '#E3EAF9',
                    style: {
                        backgroundColor: '#E3EAF9'
                    },
//                    style: 'margin-right:5px;',
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbtDetail',
                            fieldLabel: '',
                            horizontal: true,
                            hidden: false,
                            items: [
                                {boxLabel: '<span>Cash</span>', name: 'rbD', inputValue: 'CASH', width: 50, checked: true},
                                {boxLabel: '<span>Credit Card</span>', name: 'rbD', inputValue: 'CREDIT', width: 85}
                            ],
                            listeners: {
                                change: 'btnDisplay_click'
                            },
                            style: {
                                backgroundColor: '#e0f0ff',   // azul claro
                                borderRadius: '5px',
                                border: '1px solid #99ccff'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    id: prototype.id + '-filterChange',
                    hidden: true,
                    padding: '2 10 5 0',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Quantity',
                            margin: '0 5 0 0',
                            width: 50,
                            id: prototype.id + '-COL'
                        },
                        {
                            xtype: 'component',
                            id: prototype.id + '-btnToggleSwitchSalesAgent',
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
                            tooltip: 'Export to Report',
                            listeners: {
                                change: 'chgBash',
                                click: 'chgBash'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Amount',
                            margin: '0 0 0 5',
                            width: 60,
                            id: prototype.id + '-EXT'
                        },
                    ]
                },
                {
                    xtype: 'form',
                    border: false,
                    hidden:true,
                    id: prototype.id + '-cargaMerchant',
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                     margin: '0 10 0 0' ,
                    defaults: {
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
                            xtype: 'form',
                            id: prototype.id + '-formMerchant',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-file',
                                    name: 'excelfile',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 300,
                                    buttonAlign: 'left',
                                    buttonText: 'Select excel...',
                                    regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                    regexText: 'Only XLS and XLSX formats are accepted',
                                    buttonConfig: {
                                        text: '<strong>Select</strong>',
                                        width: 80,
                                    },
                                    listeners: {
                                        //change: 'onUploadChange'
                                    }
                                }]
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn_CargaMerchant',
                            margin: '1 0 0 0',
                            html: '<strong style="color:white;">Load Invoice</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onLoadClick'
                            }
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    hidden:true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 16,
                    width: 110,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    },
                    margin: '0 10 0 0' 
                },
                {
                    xtype: 'label',
                    text: 'Merchant:',
                    width: 60,
                    hidden:true,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'textfield',
                    hidden:true,
                    id: prototype.id + '-txtCMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 16,
                    width: 110,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    hidden:true,
                    text: 'Branch Merchant:',
                    width: 100,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'textfield',
                    hidden:true,
                    id: prototype.id + '-txtBMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 16,
                    width: 120,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    hidden:true,
                    text: 'Credit Card Code:',
                    width: 100,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'combo',
                    hidden:true,
                    id: prototype.id + '-cmbCardType',
                    disabled: false,
                    width: 150,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODE',
                    displayField: 'NAME',
                    hiddenLabel: false,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    hidden:true,
                    text: 'Processor:',
                    width: 60,
                    margin: '1.5 0 0 0'
                },
                {
                    xtype: 'combo',
                    hidden:true,
                    hidden:true,
                    id: prototype.id + '-cmbCOREP',
                    width: 130,
                    emptyText: 'All',
                    displayField: 'NAME',
                    valueField: 'VALUE',
                    queryMode: 'local',
                    editable: true,
                    forceSelection: true,
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'checkboxfield',
                    hidden:true,
                    id: prototype.id + '-chkViewHistoric',
                    boxLabel: 'View Historic',
                    name: 'validationOption',
                    inputValue: '1',
                    uncheckedValue: '0',
                    listeners: {
                        change: 'btnSearch_clickHistoric' 
                    }
                },
                {
                    xtype: 'label',
                    hidden:true,
                    html: '<strong>Cta Bank:</strong>',
                    padding: '7 0 0 10',
                    width: 87,
                    hidden: true,
                },
                {
                    xtype: 'textfield',
                    hidden:true,
                    id: prototype.id + '-txtCTABANK',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 15,
                    hidden: true,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
            ]
        }
    ]
});



