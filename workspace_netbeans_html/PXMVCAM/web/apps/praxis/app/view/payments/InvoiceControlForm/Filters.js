Ext.define('Ext.Praxis.view.payments.InvoiceControlForm.Filters', {
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
            margin: '8px 0 5px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    fieldLabel: 'Society',
                    xtype: 'combo',
                    width: 150,
                    labelWidth: 50,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    disabled: true,
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
                    enableKeyEvents: true,
                    triggerAction: 'all',
                     margin: '0 10 0 0',
                      listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtINVOICE',
                    fieldLabel: 'Invoice',
                    disabled: true,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    labelWidth: 45,
                    enforceMaxLength: true,
                    hidden: false, 
                    maskRe: /[0-9A-Za-z]/, 
                    maxLength: 20, 
                    width: 203,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keyup: 'onUpperValue',
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'form',
                    border: false,
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



