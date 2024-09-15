Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.FiltersByBank', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-bankFilters',
    requires: [
        'Ext.Praxis.view.widgets.MonthField'
    ],
    width:'100%',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Search By',
            margin: '30 10 10 10',
            labelStyle: 'text-align: left;font-weight:bold',
            id: prototype.id + '-cmbBankFilters',
            store: Ext.create('Ext.data.SimpleStore', {
                fields: ['code', 'name'],
                data: [
                    //['S', 'Summary'],
                    ['F', 'Browser']
                ]
            }),
            labelWidth: 75,
            width: 180,
            displayField: 'name',
            valueField: 'code',
            queryMode: 'local',
            editable: false,
            value: 'F',
            listeners: {
                change: 'onChangeFiltersBB'
            }
        },
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    hidden: true,
                    id: prototype.id + '-formFiltersBB-1',
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    //id: prototype.id + '-cmbDate',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date'],
                                            ['FEUP', 'Update Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'From',
                                    format: 'Ym',
                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    listeners: {
                                        change: 'onChangeMonthBPBtn'
                                    },
                                    name: 'month'
                                },
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'To',
                                    format: 'Ym',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    lastDay: true,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeMonthBPBtn'
                                    },
                                    name: 'month',
                                    id: prototype.id + '-monthfieldToBP'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProctype',
                                    name: 'IN_PROCTYPESQ',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key2',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesBP',
                                    name: 'IN_SCOUNTRY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMonedaBP',
                                    name: 'IN_SCURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TRANSTYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund'],
                                            ['CHBK', 'Chargeback'],
                                            ['ADJU', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    labelWidth: 50,
                                    width: 80,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['3', 'Settl. Without Sales'],
                                            ['4', 'Match Diff.'],
                                            ['5', 'Match Manual'],
                                            ['6', 'Forced Match'],
                                            ['7', 'Compensation Match'],
                                            ['8', 'Pending RFND']
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCerror',
                                    fieldLabel: 'Error Code',
                                    name: 'IN_CERROR',
                                    labelWidth: 80,
                                    width: 290,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Adj. Code',
                                    id: prototype.id + '-cmbCodadju',
                                    name: 'IN_CODADJU',
                                    labelWidth: 70,
                                    width: 230,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 185,
                                    name: 'IN_SMERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFiltersBB-2',
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '3 1 3 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '3 1 3 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    name: 'IN_CCUST',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['134', 'AV - AVIANCA'],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LATSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Date',
                                    name: 'IN_TDATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['ADATE', 'Payment Date']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDAF',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDAT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: fechaActual,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankCtry2',
                                    name: 'IN_SCOUNTRY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 210,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankCurr2',
                                    name: 'IN_SCURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TDOC',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['S', 'Sale'],
                                            ['D', 'Debit']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankCOREP2',
                                    name: 'IN_COREP',
                                    labelWidth: 80,
                                    width: 200,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    fieldLabel: 'Sugg. Proc.',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '', // Valor inicial (vacío)
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '3 1 3 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['1', 'Match'],
                                            ['3', 'Statement w/o Settlement'],
                                            ['4', 'Match Diff.'],
                                            ['5', 'Match Manual']
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 220,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
//                                {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'Bank Code',
//                                    labelWidth: 70,
//                                    width: 150,
//                                    name: 'IN_CODEBANK',
//                                    maxLength: 4, // Límite máximo de caracteres
//                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
//                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
//                                    listeners: {
//                                        specialkey: 'onEnterKeyPress'
//                                    }
//                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankCodebank2',
                                    name: 'IN_CODEBANK',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Bank Code',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 200,
                                    typeAhead: true,
                                    valueField: 'CODBANKN',
                                    displayField: 'NAMEBANK',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Reference',
                                    labelWidth: 80,
                                    width: 230,
                                    name: 'IN_REFER',
                                    maxLength: 20, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'NET',
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_NETO',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe:  /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Loc. Amount',
                                    labelWidth: 80,
                                    width: 180,
                                    name: 'IN_LOCAMOUNT2',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe:  /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankLocCurr2',
                                    name: 'IN_LOCRENCY2',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Loc. Curr.',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbBankCODPRO2',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 250,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
                                    fieldLabel: 'Recon. Proc.',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '', // Valor inicial (vacío)
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SEQPRO',
                                    id:prototype.id + '-txtBankSEQPRO2',
                                    value: '',
                                    hidden: true,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '3 1 3 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bank Doc.',
                                    labelWidth: 80,
                                    width: 180,
                                    name: 'IN_BANDOC',
                                    maxLength: 10, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant ID',
                                    labelWidth: 80,
                                    width: 200,
                                    name: 'IN_MERCHANT',
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Large Text',
                                    labelWidth: 80,
                                    width: 300,
                                    name: 'IN_TEXTOLAR',
                                    maxLength: 400, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
