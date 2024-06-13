Ext.define('Ext.Praxis.view.payments.ExchangeRateForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryExchangeRateForm',
    requires:[
        'Ext.Praxis.controller.payments.ExchangeRate.DataEntryExchangeRateController'
    ],
    controller: 'DataEntryExchangeRateController',
    title:'Exchange Rate - Data Entry Form',
    header:true,
    height:400,
    width:1100,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: #E5ECEF;"',
                    layout: 'vbox',
                    width:1800,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {   
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1800
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Exchange Rate Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                    width: 200,
                                    height: 30
                                },
                                { xtype: 'tbspacer', width: 786 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                
                                {
                                    xtype: 'label',
                                    text: 'Currency1',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 22 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSCURRENCY1',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    //fieldLabel: 'Currency',
                                    labelAlign: 'right',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 365,
                                    labelWidth: 57,
                                    typeAhead: true,
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    labelStyle: 'font-weight: bold;',
                                    listeners: {
                                    }
                                },

                                { xtype: 'tbspacer', width: 100 },
                                {
                                    xtype: 'label',
                                    text: 'Currency2',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 22 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSCURRENCY2',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    //fieldLabel: 'Currency',
                                    labelAlign: 'right',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 305,
                                    labelWidth: 57,
                                    typeAhead: true,
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    labelStyle: 'font-weight: bold;',
                                    listeners: {
                                    }
                                },
                                
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 22 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDATECH',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength:8,
                                    readOnly: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 87},
                                {
                                    xtype: 'label',
                                    text: 'FactorD:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 68 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtFACTORD',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 60
                                },
                                { xtype: 'tbspacer', width: 100 },
                                {
                                    xtype: 'label',
                                    text: 'FactorA:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 67 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtFACTORA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 48 },
                                
                                {
                                    xtype: 'label',
                                    text: 'Rate:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 17},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
//                                    maskRe: /[0-9a-zA-Z]/,
                                    //maxLength:50,
                                    readOnly: false,
                                    width: 90,
                                    maxLength: 23,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        change: function(field, newValue) {
                                            // Trunca a 8 decimales si hay más de 8
                                            var parts = newValue.split('.');
                                            if (parts.length > 2) {
                                                // Elimina cualquier punto adicional
                                                newValue = parts[0] + '.' + parts.slice(1).join('');
                                                parts = newValue.split('.');
                                            }
                                            if (parts[1] && parts[1].length > 8) {
                                                parts[1] = parts[1].substring(0, 8); // Limita a 8 decimales
                                            }
                                            if (parts[0].length > 13) {
                                                parts[0] = parts[0].substring(0, 13); // Limita la parte entera a 13 dígitos
                                            }
                                            field.setValue(parts.join('.'));
                                        }
                                    },
                                },                             
                                     
                                { xtype: 'tbspacer', width: 24 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'T/C Cotiz. Ind:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 102
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTCCOTIND',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
//                                    maxLength: 1,
                                    //maskRe: /[0-9]/,
                                    readOnly: false,
                                    maxLength: 23,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        change: function(field, newValue) {
                                            // Trunca a 8 decimales si hay más de 8
                                            var parts = newValue.split('.');
                                            if (parts.length > 2) {
                                                // Elimina cualquier punto adicional
                                                newValue = parts[0] + '.' + parts.slice(1).join('');
                                                parts = newValue.split('.');
                                            }
                                            if (parts[1] && parts[1].length > 8) {
                                                parts[1] = parts[1].substring(0, 8); // Limita a 8 decimales
                                            }
                                            if (parts[0].length > 13) {
                                                parts[0] = parts[0].substring(0, 13); // Limita la parte entera a 13 dígitos
                                            }
                                            field.setValue(parts.join('.'));
                                        }
                                    },
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 87 },
                                {
                                    xtype: 'label',
                                    text: 'T/C Cotiz. Dir:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 28 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTCCOTDIR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
//                                    maxLength: 4,
//                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    maxLength: 23,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        change: function(field, newValue) {
                                            // Trunca a 8 decimales si hay más de 8
                                            var parts = newValue.split('.');
                                            if (parts.length > 2) {
                                                // Elimina cualquier punto adicional
                                                newValue = parts[0] + '.' + parts.slice(1).join('');
                                                parts = newValue.split('.');
                                            }
                                            if (parts[1] && parts[1].length > 8) {
                                                parts[1] = parts[1].substring(0, 8); // Limita a 8 decimales
                                            }
                                            if (parts[0].length > 13) {
                                                parts[0] = parts[0].substring(0, 13); // Limita la parte entera a 13 dígitos
                                            }
                                            field.setValue(parts.join('.'));
                                        }
                                    },
                                    width: 60
                                }
                                ,
                                { xtype: 'tbspacer', width: 100 },
                                {
                                    xtype: 'label',
                                    text: 'T/C Cotiz. Ind2:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 17 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTCCOTIND2',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    //maskRe: /[0-9a-zA-Z]/,
                                    //maxLength:10,
                                    readOnly: false,
                                    maxLength: 23,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        change: function(field, newValue) {
                                            // Trunca a 8 decimales si hay más de 8
                                            var parts = newValue.split('.');
                                            if (parts.length > 2) {
                                                // Elimina cualquier punto adicional
                                                newValue = parts[0] + '.' + parts.slice(1).join('');
                                                parts = newValue.split('.');
                                            }
                                            if (parts[1] && parts[1].length > 8) {
                                                parts[1] = parts[1].substring(0, 8); // Limita a 8 decimales
                                            }
                                            if (parts[0].length > 13) {
                                                parts[0] = parts[0].substring(0, 13); // Limita la parte entera a 13 dígitos
                                            }
                                            field.setValue(parts.join('.'));
                                        }
                                    },
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 24 }
                            ]                                                     
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 30',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'T/C Cotiz. Dir2:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 102
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTCCOTDIR2',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
//                                    maskRe: /[0-9a-zA-Z]/,
                                    //maxLength:10,
                                    readOnly: false,
                                    maxLength: 23,
                                    maskRe: /[0-9.]/,
                                    listeners: {
                                        change: function(field, newValue) {
                                            // Trunca a 8 decimales si hay más de 8
                                            var parts = newValue.split('.');
                                            if (parts.length > 2) {
                                                // Elimina cualquier punto adicional
                                                newValue = parts[0] + '.' + parts.slice(1).join('');
                                                parts = newValue.split('.');
                                            }
                                            if (parts[1] && parts[1].length > 8) {
                                                parts[1] = parts[1].substring(0, 8); // Limita a 8 decimales
                                            }
                                            if (parts[0].length > 13) {
                                                parts[0] = parts[0].substring(0, 13); // Limita la parte entera a 13 dígitos
                                            }
                                            field.setValue(parts.join('.'));
                                        }
                                    },
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 87 },
                                {
                                    xtype: 'label',
                                    text: 'Treg:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 30
                                },
                                { xtype: 'tbspacer', width: 88 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTREG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 1,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    listeners: {
                                        change: function (field, newValue) {
                                            // Convierte cualquier letra minúscula a mayúscula
                                            var upperCaseValue = newValue.toUpperCase();
                                            field.setValue(upperCaseValue);
                                        }
                                    },
                                    width: 60
                                    
                                }
                                ,
                                { xtype: 'tbspacer', width: 101 },
                                {
                                    xtype: 'label',
                                    text: 'Sign:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 30
                                },
                                { xtype: 'tbspacer', width: 86 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSIGN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength:1,
                                    readOnly: false,
                                    listeners: {
                                        change: function (field, newValue) {
                                            // Convierte cualquier letra minúscula a mayúscula
                                            var upperCaseValue = newValue.toUpperCase();
                                            field.setValue(upperCaseValue);
                                        }
                                    },
                                    width: 100
                                },
                                                                     
                                { xtype: 'tbspacer', width: 24 }
                            ]                                                     
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                { xtype: 'tbspacer', heigth: 105 },
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
                    margin: '4 10 4 35'
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 10 180',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border:false,
                            layout: 'hbox',
                            margin: '5 0 10 180',
                            
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
  }
);