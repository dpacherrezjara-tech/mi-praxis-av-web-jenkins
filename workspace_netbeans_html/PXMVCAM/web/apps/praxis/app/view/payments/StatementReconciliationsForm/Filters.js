Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-filterMain_1',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 5px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    fieldLabel: 'Search By',
                    width: 160,
                    labelWidth: 60,
                    labelAlign: 'left',
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateSel',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    fieldStyle: 'text-align: left;',
                    hidden: false
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
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
                    labelWidth: 35,
                    width: 100,
                    labelAlign: 'left',
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
                    width: 60
                },
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
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 50,
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
                    labelWidth: 30,
                    width: 120
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
                    width: 60,
                    anchor: '100%'
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
                {xtype: 'tbspacer', width: 15, height:20},
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
                    fieldLabel: 'Country',
                    width: 200,
                    labelWidth: 50,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    labelAlign: 'left',
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'combo',
                    fieldLabel: 'Processor',
                    labelAlign: 'left',
                    id: prototype.id + '-cmbCOREP',
                    queryMode: 'local',
                    allowBlank: false,
//                    hidden: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 200,
                    labelWidth: 60,
                    typeAhead: true,
                    valueField: 'VALUE',
                    displayField: 'NAME',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    fieldLabel: 'Status',
                    labelAlign: 'left',
                    width: 180,
                    labelWidth: 40,
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
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
                    value: "",
                    hidden: false,
                    typeAhead: true,
                    valueField: 'value', displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    fieldLabel: 'Source',
                    labelAlign: 'left',
                    width: 180,
                    labelWidth: 40,
                    xtype: 'combo',
                    id: prototype.id + '-cmbSource',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["", "All"], ["B", "BSP"], ["I", "ICCS"], ["A", "ARC"], ["S", "SALES DIRECT"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    value: "",
                    hidden: true,
                    typeAhead: true,
                    valueField: 'value', displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
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
                    html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
<title>Modo Alternancia</title>\n\
<style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body>\n\
<label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
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
            margin: '6px 0 5px 15px',
            layout: 'column',
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
                    fieldLabel: 'Doc. Type',
                    labelWidth: 60,
                    xtype: 'combo',
                    id: prototype.id + '-cmbTDOC',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'value',
                    displayField: 'description',
                    fieldStyle: 'text-align: left;',
                    width: 160,
                    hidden: false,
                    value: '',
                    labelAlign: 'left',
                    store: {
                        fields: ['value', 'description'],
                        data: [
                            {value: '', description: 'All'},
                            {value: 'S', description: 'Sales'},
                            {value: 'D', description: 'Debits'}
                        ]
                    }
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'combo',
                    fieldLabel: 'Code Bank',
                    id: prototype.id + '-cmbBank',
                    queryMode: 'local',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'left',
                    width: 245,
                    labelWidth: 66,
                },
                {xtype: 'tbspacer', width: 15, height:20},
                
                // arregalmos docsapbank
              {
                xtype: 'container',
                id: prototype.id + '-cntDocSap',
                

                margin: '0 0 0 0', // normal para CreditCard
                items: [
                    {
                        fieldLabel: 'Doc Sap Bank',
                        labelAlign: 'left',
                        xtype: 'textfield',
                        id: prototype.id + '-txtBANDOC',
                        width: 170,
                        labelWidth: 84,
                        enableKeyEvents: true,
                        listeners: {
                            keypress: 'eventKey_BANDOC'
                        }
                    }
                ]
            },

                {xtype: 'tbspacer', width: 15, height:20},
                
                
                //
                //timepicker
                
                          
                 {
                    xtype: 'fieldcontainer',
                    id: prototype.id + '-fcDateRange', 
                    fieldLabel: 'Time Picker',
                        hidden: true,
                    layout: 'table',
                    margin: '9 0 0 0',

                    defaults: {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        submitFormat: 'Ymd',
                        editable: false,
                        allowBlank: true,
                        margin: '0 5 0 0', // espacio entre campos
                        width: 160,
                         listeners: {
                            change: function (field) {
                                const form = field.up('form');
                                const desde = form.down('[name=FEC_DESDE]').getValue();
                                const hasta = form.down('[name=FEC_HASTA]').getValue();
                                if (desde && hasta && hasta < desde) {
                                    Ext.Msg.alert('Validación', 'La fecha "Hasta" no puede ser menor que la fecha "From".');
                                    field.setValue(null);
                                }
                            }
                        }
                    },
                    items: [
                        {
                            id: prototype.id + '-FEC_FROM',
                            name: 'FEC_DESDE',
                            emptyText: 'From'
                        },
                        {
                            
                            id: prototype.id + '-FEC_TO',
                            name: 'FEC_HASTA',
                            emptyText: 'To'
                        }
                    ]
                },

                       
                
                //
                
                
                
                {
                    xtype: 'combo',
                    hidden: true,
                    id: prototype.id + '-cmbExt',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'description'],
                        data: [
                            ["E", "Ext"], ["C", "Col"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: false,
                    width: 50,
                    value: "E",
                    hidden: false,
                    typeAhead: true,
                    valueField: 'value', displayField: 'description',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
                {
                    xtype: 'form',
                    id: prototype.id + '-formLIQvsEC',
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [{

                            xtype: 'filefield',
                            id: prototype.id + '-file',
                            name: 'excelfile',
                            allowBlank: true,
                            accept: '.xlsx, .xls',
                            labelWidth: 85,
                            width: 250,
                            buttonAlign: 'left',
                            buttonText: 'Select excel...',
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text: '<strong>Select</strong>',
                                width: 60,
                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                            }
                        }]
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn_Concilia_LIQvsEC',
                    html: '<strong style="color:white;">Conciliar</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
                    border: false,
                    listeners: {
                        click: 'onLoadClick_conciliaEC'
                    }
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'label',
                    text: 'Pending Buss',
                    id: prototype.id + '-labelpendingBuss',
                    align: 'left',
                    style: 'text-align: left;',
                    hidden: false,
                    margin: '3 0 0 0'
                },
                {xtype: 'tbspacer', width: 10, height: 20},
                {
                    xtype: 'checkbox',
                    id: prototype.id + '-pendingBuss',
                    inputValue: 'Refund', 
                    name: 'chkPendingBuss',
                    boxLabelAlign: 'before',
                    listeners: {
                        change: 'pendingBuss_changeHandler'
                    }
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    fieldLabel: 'Business',
                    hidden: true,
                    labelAlign: 'left',
                    width: 150,
                    labelWidth: 50,
                    xtype: 'combo', 
                    id: prototype.id + '-cmbNEGOC',
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
                            {code: 'B', name: 'Pending'},
                            {code: '1', name: 'Pasajes'},
                            {code: '2', name: 'Cargo'},
                            {code: '3', name: 'Correo'}
//                            {code: 'S', name: 'Standby'}
                        ]
                    }
                },
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
                {xtype: 'tbspacer', width: 150, height:20},
                {
                    xtype: 'label',
                    text: 'CreditCard',
                    margin: '3 0 0 3',
                    id: prototype.id + '-CRD',
                    width: 60
                },
                {
                    xtype: 'component',
                    id: prototype.id + '-btnToggleSwitchCASH',
                    margin: '5 0 0 3',
                    html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modo Alternancia</title><style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body><label class="toggle-container"><input type="checkbox" id="chkCash" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                    tooltip: 'Export to Report',
                    listeners: {
                        
//                        click: 'onGridDetLiquidaCash'
                    }
                  
                },
                {
                    xtype: 'label',
                    text: 'Cash',
                    margin: '3 0 0 13',
                    id: prototype.id + '-CASH',
                    width: 60
                },
                
                
                
                
                
                

                
                
            ]
        },
        
        
        
        //new radiogroup
        
        {
    xtype: 'container',
    layout: 'hbox',
    width: '100%',
    margin: '10 0 0 40',
    items: [
        {
            xtype: 'radiogroup',
            id: prototype.id + '-rbgTypeCASH',
            minHeight: 32,
                hidden: true,
            width: '100%',     // 
            items: [
                { boxLabel: '<b style="color:#148D28;">Normal</b>', inputValue: 'Normal', name: 'rbgTypeCASH', checked: true },
                { xtype: 'tbspacer', width: 20 },
                { boxLabel: '<b style="color:#148D28;">Detalle</b>', inputValue: 'Detalle', name: 'rbgTypeCASH' }
            ],
            listeners: {
                change: 'cmbTranType_changeHandler'
            }
        }
    ]
},

        
        
        
        
        
        ///
        
        
        
        
        
        
                {
            xtype: 'form',
            border: false,
            id: prototype.id + '-filterMain_3',
            bodyStyle: 'background: transparent',
            margin: '5px 0 0 15px',
            layout: 'column',
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
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'radiogroup',
                    hidden: true,
                    id: prototype.id + '-rbgType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Doc Sap   </strong>', name: 'rb', inputValue: 'rbDOCS', width: 80, checked: true},
                        {boxLabel: '<strong style="color:#148D28" >Taca Flown </strong>', name: 'rb', inputValue: 'rbTACA', width: 90}
                    ],
                    listeners: {
                        change: 'searchTRANSA_clickHandler'
                    }
                },
               
            ]
        }
    ]
});
