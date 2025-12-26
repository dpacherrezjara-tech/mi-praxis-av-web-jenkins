Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '12px 0 8px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    fieldLabel: 'Av Group',
                    xtype: 'combo',
                    hidden: true,
                    id: prototype.id + '-cmbAviancaGroup',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"], ["134", "AVIANCA"], ["202", "TACA"], ["133", "LACSA"], ["547", "AEROGAL"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    disabled: true,
                    width: 140,
                    labelWidth: 55,
                    value: "",
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Select by',
                    xtype: 'combo',
                    width: 170,
                    labelWidth: 55,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    id: prototype.id + '-cmbSelectBy',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 130},
                    typeAhead: true,
                    value: 'A',
                    valueField: 'value',
                    displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners: {
                        change: 'onChangeSelectBy'
                    },
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["T", "Totals by credit card"],
                            ["P", "Pending by credit card"],
                            ["C", "By Clarification"],
                            ["V", "Provisions"],
                            ["X", "Total by conciliation"],
//                            ["Y", "Total MDP"],
                            ["A", "Process Status"],
                        ]
                    }),
                    margin: '0 10 0 0'
                },
                //<editor-fold defaultstate="collapsed" desc="cmbDate">
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
                //</editor-fold>
                {
                    xtype: 'combo',
                    fieldLabel: 'Processor',
                    id: prototype.id + '-cmbProcessor',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 180,
                    labelWidth: 55,
                    typeAhead: true,
                    valueField: 'A4451KEY2',
                    displayField: 'A4451KEY3',
                    listConfig: {minWidth: 130},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Bandoc',
                    xtype: 'textfield',
                    id: prototype.id + '-txtBANDOC',
                    labelWidth: 45,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 10,
                    width: 130,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    fieldLabel: 'Refer',
                    xtype: 'textfield',
                    id: prototype.id + '-txtREFER',
                    labelWidth: 35,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9A-Za-z]/,
                    maxLength: 20,
                    width: 180,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    fieldLabel: 'ID Cont',
                    xtype: 'textfield',
                    id: prototype.id + '-txtIDCONT',
                    labelWidth: 48,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9A-Za-z]/,
                    maxLength: 25,
                    width: 180,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    fieldLabel: 'Header',
                    xtype: 'textfield',
                    id: prototype.id + '-txtHeaderText',
                    labelWidth: 40,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9A-Za-z]/,
                    maxLength: 20,
                    width: 180,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    fieldLabel: 'Acc Prov',
                    xtype: 'textfield',
                    id: prototype.id + '-txtAccprov',
                    labelWidth: 50,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9A-Za-z]/,
                    maxLength: 6,
                    width: 130,
                    enableKeyEvents: true,
                    margin: '0 10 0 0',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Code Error',
                    id: prototype.id + '-cmbCodeError',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 210,
                    labelWidth: 65,
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    listConfig: {minWidth: 130},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'container',
                     id: prototype.id + '-toggleCashAndCredit',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    padding: '0 10 3 0',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            padding: '0 10 5 10',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Credit Card',
                                    margin: '0 5 0 0',
                                    width: 62,
                                    id: prototype.id + '-togleCredit'
                                },
                                {
                                    xtype: 'component',
                                    id: prototype.id + '-btnToggleSwitchCashOrCredit',
                                    margin: '0 5 0 0',
                                    html: `<style>
                                                                    .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                                    .toggle-input{opacity:0;width:0;height:0;}
                                                                    .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                                    .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                                    .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                                    .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                                                </style>
                                                                <label class="toggle-container">
                                                                    <input type="checkbox" class="toggle-input">
                                                                    <span class="toggle-slider"></span>
                                                                </label>`,
                                    tooltip: 'Export to Report',
                                    listeners: {
                                        change: 'chgBash',
                                        click: 'chgBash'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Cash',
                                    margin: '0 0 0 5',
                                    width: 80,
                                    id: prototype.id + '-togleCash'
                                }
                            ]
                        }
                    ]
                },
//                {
//                    xtype: 'form',
//                    border: false,
//                    id: prototype.id + '-cargaMerchant',
//                    bodyStyle: 'background: transparent',
//                    layout: 'column',
//                     margin: '0 10 0 0' ,
//                    defaults: {
//                        fieldStyle: 'text-align: center;',
//                        anchor: '100%',
//                        hiddenLabel: false,
//                        labelAlign: 'right',
//                        xtype: 'textfield',
//                        hidden: false,
//                        selectOnFocus: true
//                    },
//                    items: [
//                        {
//                            xtype: 'form',
//                            id: prototype.id + '-formMerchant',
//                            border: false,
//                            bodyStyle: 'background-color: #E3EAF9;',
//                            items: [{
//                                    xtype: 'filefield',
//                                    id: prototype.id + '-file',
//                                    name: 'txtfile',
//                                    allowBlank: true,
//                                    accept: '.xlsx, .xls',
//                                    labelWidth: 85,
//                                    width: 200,
//                                    buttonAlign: 'left',
//                                    buttonText: 'Select excel...',
//                                    regex: /(.)+(\.txt)$/i,
//                                    regexText: 'Only TXT format is accepted',
//                                    buttonConfig: {
//                                        text: '<strong>Select</strong>',
//                                        width: 80,
//                                    },
//                                    listeners: {
//                                        //change: 'onUploadChange'
//                                    }
//                                }]
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btn_CargaError',
//                            margin: '1 0 0 0',
//                            html: '<strong style="color:white;">Mark Reviewed</strong>',
//                            style: 'background:#24678D;color:white;font-weight:bold;',
//                            border: false,
//                            listeners: {
//                                click: 'onLoadClick'
//                            }
//                        },
//                    ]
//                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    fieldLabel: 'Country',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    hidden: true,
                    editable: true,
                    width: 219,
                    labelWidth: 50,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 200},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Agent',
                    xtype: 'textfield',
                    hidden: true,
                    id: prototype.id + '-txtAGENCY',
                    labelWidth: 40,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 8,
                    width: 120,
                    enableKeyEvents: true,
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Percentage',
                    xtype: 'combo',
                    hidden: true,
                    id: prototype.id + '-cmbPercentage',
                    queryMode: 'local',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 140,
                    labelWidth: 65,
                    typeAhead: true,
                    valueField: 'value',
                    value: "",
                    displayField: 'description',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["", "All"], ["10", "10%"], ["20", "20%"], ["30", "30%"], ["40", "40%"], ["50", "50%"], ["60", "60%"], ["70", "70%"], ["80", "80%"], ["90", "90%"]
                        ]
                    }),
                    listConfig: {maxHeight: 200},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Canal',
                    xtype: 'combo',
                    hidden: true,
                    id: prototype.id + '-cmbSource',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: left; font-size: 12px;',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"], ["BSP", "BSP"], ["AMA", "AMA"], ["ARC", "ARC"]
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
                    labelWidth: 38,
                    value: "",
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Cut.Days',
                    xtype: 'textfield',
                    hidden: true,
                    id: prototype.id + '-txtCUTDAYS',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 4,
                    width: 110,
                    labelWidth: 55,
                    enableKeyEvents: true,
                    margin: '0 10 0 0'
                },
                {
                    fieldLabel: 'Process',
                    xtype: 'textfield',
                    hidden: true,
                    id: prototype.id + '-txtFECR',
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maxLength: 20,
                    width: 140,
                    labelWidth: 45,
                    enableKeyEvents: true,
                    readOnly: true,
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'label',
                    text: '-',
                    hidden: true,
                    id: prototype.id + '-rayita',
                    width: 5,
                    style: {
                        fontWeight: 'bold'
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtHOCR',
                    hidden: true,
                    labelStyle: 'text-align: left; font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    enforceMaxLength: true,
                    maxLength: 15,
                    width: 70,
                    enableKeyEvents: true,
                    readOnly: true,
                    margin: '0 10 0 0'
                },
                {xtype: 'tbspacer', width: 1, id: prototype.id + '-hidePENDING', hidden: true},
                {
                    xtype: 'checkbox',
                    boxLabel: 'Pending',
                    hidden: true,
                    id: prototype.id + '-chkboxTypeRecord',
////                            inputValue: '1', 
//                            uncheckedValue: '0', 
                    margin: '0 0 0 15',
                    listeners: {
                        change: 'onChkboxPending'
                    }
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Surplus',
                    hidden: true,
                    id: prototype.id + '-chkboxSurplus',
////                            inputValue: '1', 
//                            uncheckedValue: '0', 
                    margin: '0 0 0 15',
                    listeners: {
                        change: 'onChkboxSurplus'
                    }
                }
            ]
        }
    ]
});
