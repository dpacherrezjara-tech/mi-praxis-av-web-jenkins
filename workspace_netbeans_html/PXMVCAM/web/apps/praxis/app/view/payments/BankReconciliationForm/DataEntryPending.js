Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryPending', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPendingBankReconciliationForm',
    id: 'BankReconciliationForm-dataEntryPending',
    requires: [
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryPendingBankReconciliationController'
    ],
    controller: 'DataEntryPendingBankReconciliationController',
    title: 'BankReconciliation - Data Entry Pending Form',
    header: true,
    height: 400,
    width: 720,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Pending Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'panel', // Contenedor para el combo box (lo que estaba antes)
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Exception',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-txtExceptionExterior',
                                    width: 110,
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    valu: '',
                                    store: [
                                        {code: '', name: 'All'},
                                        {code: '1', name: 'ARGENTINA'},
                                        {code: '2', name: 'INDIA'}
                                    ],
                                    displayField: 'name',
                                    valueField: 'code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    listeners: { 
                                        select: 'onExceptionSelect'
                                    }
                                }
                            ]
                        },
                        
                        // ========================================================
                        // 1. PANEL DE CAMPOS PENDIENTES (SE MUESTRA POR DEFECTO)
                        // ========================================================
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pnlPENDINGFIELDS', 
                            layout: 'vbox',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { // Panel Agent, Status, Value Date (hbox)
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Agent ',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtAGENTMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'background-color:#FFF2CC; color:#0B333C; text-align:center; font-weight:bold;',
                                            editable: true,
                                            maskRe: /^[0-9]$/, // SOLO NÚMEROS
                                            regex: /^[0-9]{8}$/, // VALIDACIÓN EXACTA (8 números)
                                            maxLength: 8,
                                            minLength: 8,
                                            enforceMaxLength: true,
                                            align: 'center',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 35},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtSTATUSMPF199',
                                            width: 110,
                                            queryMode: 'local',
                                            editable: false,
                                            forceSelection: true,
                                            store: [
                                                {code: '1', name: 'Match'},
                                                {code: '3', name: 'Pending'}
                                            ],
                                            displayField: 'name',
                                            valueField: 'code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;'
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Value Date',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtVALUEDATEMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 90,
                                            maskRe: /^[0-9]$/, // SOLO NÚMEROS
                                            regex: /^[0-9]{8}$/, // VALIDACIÓN EXACTA (8 números)
                                            maxLength: 8,
                                            minLength: 8,
                                            enforceMaxLength: true, // BLOQUEA escribir más de 8
                                            allowBlank: false, // NO permite vacío
                                            validator: function (val) {
                                                return (/^[0-9]{8}$/.test(val)) ? true : 'Fecha debe ser Año-Mes-Dia';
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 20}
                                    ]
                                },
                                // Panel Concept, Adj Type, Consol (hbox)
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Concept',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 17},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtCONCEPTMPF199',
                                            width: 90,
                                            queryMode: 'local',
                                            editable: false,
                                            forceSelection: true,
                                            store: [
                                                {code: 'P', name: 'Positive'},
                                                {code: 'N', name: 'Negative'},
                                                {code: 'X', name: 'No Billing'},
                                                {code: 'A', name: 'No Adjustment'},
                                                {code: 'M', name: 'Automatic'},
                                                {code: 'C', name: 'Compensation'},
                                            ],
                                            displayField: 'name',
                                            valueField: 'code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Adj Type',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-txtATYPEMPF199',
                                            width: 110,
                                            queryMode: 'local',
                                            editable: false,
                                            forceSelection: true,
                                            store: [
                                                {code: 'N', name: 'Non Remmitance'},
                                                {code: 'R', name: 'Recovery'},
                                                {code: 'U', name: 'Uncleared'},
                                                {code: 'E', name: 'Excess'},
                                                {code: 'S', name: 'Short'}
                                            ],
                                            displayField: 'name',
                                            valueField: 'code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;'
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Consol',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 9},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCONSOLMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        }
                                    ]
                                },
                                // Panel Currency, Neto, Issued Payment (hbox)
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 17},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCURRENCYMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 60,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 80},
                                        {
                                            xtype: 'label',
                                            text: 'Neto',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNETOMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 100,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 47},
                                        {
                                            xtype: 'label',
                                            text: 'Issued Payment',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 23},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtIPAYMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 90,
                                            enforceMaxLength: true
                                        }
                                    ]
                                },
                                // Panel Start Date, End Date, Country (hbox)
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Start Date',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSTARTMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 90,
                                            maskRe: /^[0-9]$/, // SOLO NÚMEROS
                                            regex: /^[0-9]{8}$/, // VALIDACIÓN EXACTA (8 números)
                                            maxLength: 8,
                                            minLength: 8,
                                            enforceMaxLength: true, // BLOQUEA escribir más de 8
                                            allowBlank: false, // NO permite vacío
                                            validator: function (val) {
                                                return (/^[0-9]{8}$/.test(val)) ? true : 'Fecha debe ser Año-Mes-Dia';
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'End Date',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 72
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtENDMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            width: 100,
                                            maskRe: /^[0-9]$/, // SOLO NÚMEROS
                                            regex: /^[0-9]{8}$/, // VALIDACIÓN EXACTA (8 números)
                                            maxLength: 8,
                                            minLength: 8,
                                            enforceMaxLength: true, // BLOQUEA escribir más de 8
                                            allowBlank: false, // NO permite vacío
                                            validator: function (val) {
                                                return (/^[0-9]{8}$/.test(val)) ? true : 'Fecha debe ser Año-Mes-Dia';
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 72
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCOUNTRY',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            width: 95,
                                            editable: true,
                                            readOnly: false,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            emptyText: 'All',
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE'
                                        },
                                        {xtype: 'tbspacer', width: 10}
                                    ]
                                },
                                // Panel Reference, Comment (hbox)
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Reference',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtREFEMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 240,
                                            enforceMaxLength: true
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Comment',
                                            hidden: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 65
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCOMMENTSMPF199',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            width: 240,
                                            enforceMaxLength: true
                                        }
                                    ]
                                }
                            ] // Fin de items de pnlPENDINGFIELDS
                        }, 
                        // ========================================================
                        // 2. PANEL DE RENDICIÓN BSP (SE OCULTA/MUESTRA DINÁMICAMENTE)
                        // ========================================================
                        
                        // ========================================================


                // ========================================================
                // ETIQUETA Y PANEL DE RENDICIÓN BSP (VALIDADO Y CALCULADO)
                // ========================================================

                {
                    xtype: 'label',
                    text: 'Rendición BSP Data',
                    id: prototype.id + '-titleBspArgentina',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    fontSize: '11',
                    width: 234,
                    margin: '10 2 4 8',
                    hidden: true
                },
                {
    xtype: 'panel',
    id: prototype.id + '-pnlRENDICIONBSP',
    layout: 'vbox',
    hidden: true,
    padding: '0 10 0 10',
    defaults: {
        xtype: 'panel',
        layout: 'hbox',
        border: false,
        width: 680,
        margin: '3 0 3 0',
        defaults: {
            labelWidth: 200,
            labelAlign: 'right',
            fieldStyle: 'text-align: right; font-weight: bold; color: #0B333C;',
            width: 350
        }
    },
    items: [
        // --- 1. EL SWITCH (RadioGroup) ---
        {
            xtype: 'container', // Usamos container para centrar o ajustar layout
            layout: 'hbox',
            margin: '0 0 10 0',
            items: [{
                xtype: 'radiogroup',
                fieldLabel: 'Moneda de Rendición',
                labelWidth: 200,
                labelAlign: 'right',
                id: prototype.id + '-rdMonedaGroup',
                columns: 2,
                width: 350,
                items: [
                    { boxLabel: 'Pesos (ARS)', name: 'moneda', inputValue: 'ARS', checked: true },
                    { boxLabel: 'Dólares (USD)', name: 'moneda', inputValue: 'USD' }
                ],
                listeners: {
                    // Esta es la magia: al cambiar, disparamos la función
                    change: function(field, newValue, oldValue) {
                        // Asumiendo que tienes un controlador, llamarías a 'onMonedaChange'.
                        // Aquí pongo la lógica directa para que veas cómo funciona.
                        var val = newValue.moneda; // 'ARS' o 'USD'
                        var formPanel = field.up('#' + prototype.id + '-pnlRENDICIONBSP');
                        
                        // Referencias a los campos (usando Ext.getCmp o selectores)
                        var txtRecaudacion = Ext.getCmp(prototype.id + '-txtRECAUDACION');
                        var txtTasa = Ext.getCmp(prototype.id + '-txtTASA');
                        var txtRendicion = Ext.getCmp(prototype.id + '-txtRendicion'); // Alicuota
                        var txtPago = Ext.getCmp(prototype.id + '-txtPagoTercero');
                        var txtMontoExento = Ext.getCmp(prototype.id + '-txtMontoExento'); // NUEVO CAMPO USD
                        var txtNeto = Ext.getCmp(prototype.id + '-txtNETORENDIDO');

                        if (val === 'ARS') {
                            // --- MODO ARS ---
                            txtRecaudacion.setFieldLabel('Recaudación BSP ARS:');
                            txtNeto.setFieldLabel('Neto Rendido ARS:');
                            
                            // Mostrar campos de ARS
                            txtTasa.setVisible(true);
                            txtRendicion.setVisible(true);
                            txtPago.setVisible(true);
                            
                            // Ocultar campos exclusivos de USD
                            txtMontoExento.setVisible(false);
                        } else {
                            // --- MODO USD ---
                            txtRecaudacion.setFieldLabel('Recaudación BSP USD:');
                            txtNeto.setFieldLabel('Neto Rendido USD:');
                            
                            // Ocultar campos exclusivos de ARS
                            txtTasa.setVisible(false);
                            txtRendicion.setVisible(false);
                            txtPago.setVisible(false);
                            
                            // Mostrar campos de USD
                            txtMontoExento.setVisible(true);
                        }
                        
                        // IMPORTANTE: Recalcular el total al cambiar de moneda
                        // (Necesitas adaptar tu función calculateNeto para saber en qué moneda está)
                        // me.calculateNeto(); 
                    }
                }
            }]
        },

        // --- FILA 1: Recaudacion | Tasa (ARS) ---
        {
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Recaudación BSP ARS:', // Etiqueta inicial
                    id: prototype.id + '-txtRECAUDACION',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    listeners: { change: 'calculateNeto' }
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'TASA AEROPORTUARIA:',
                    id: prototype.id + '-txtTASA',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    labelWidth: 150,
                    listeners: { change: 'calculateNeto' }
                }
            ]
        },

        // --- FILA 2: Rendicion (ARS) | Pago 3ros (ARS) ---
        {
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Rendicion de Recaudacion (Alicuota 1,20%):',
                    id: prototype.id + '-txtRendicion',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    listeners: { change: 'calculateNeto' }
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Pago a 3ros (Alicuota 1,20%):',
                    id: prototype.id + '-txtPagoTercero',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    labelWidth: 150,
                    listeners: { change: 'calculateNeto' }
                }
            ]
        },

        // --- FILA 3 (NUEVA para USD): Monto Exento ---
        // Inicialmente oculto (hidden: true) porque arranca en ARS
        {
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Monto exento:',
                    id: prototype.id + '-txtMontoExento',
                    decimalPrecision: 2,
                    hidden: true, // <--- Oculto por defecto (modo ARS)
                    alwaysDisplayDecimals: true,
                    listeners: { change: 'calculateNeto' }
                }
                // Si necesitas otro campo a la derecha para USD, ponlo aquí
            ]
        },

        // --- FILA 4: Comision MEP | I.V.A. (Compartidos) ---
        {
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Comision MEP:',
                    id: prototype.id + '-txtComisionMEP',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    listeners: { change: 'calculateNeto' }
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'I.V.A.:',
                    id: prototype.id + '-txtIVA',
                    decimalPrecision: 2,
                    alwaysDisplayDecimals: true,
                    labelWidth: 150,
                    listeners: { change: 'calculateNeto' }
                }
            ]
        },

        // --- FILA 5: Resultado ---
        {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Neto Rendido ARS:',
                    id: prototype.id + '-txtNETORENDIDO',
                    readOnly: true,
                    fieldStyle: 'background-color: #F8F8FF; color: #00008B; font-weight: bold; text-align: right;',
                    width: 400
                }
            ]
        }
    ]
},
                
                {
                    xtype: 'label',
                    text: 'Conversion IND a USD',
                    id: prototype.id + '-titleBspIndia',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    fontSize: '11',
                    width: 234,
                    margin: '10 2 4 8',
                    hidden: true
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pnlConversionIND', 
                    layout: 'vbox', 
                    hidden: true, 
                    padding: '0 10 0 10', 

                    defaults: {
                        xtype: 'panel',
                        layout: 'hbox', 
                        border: false,
                        width: 680, 
                        margin: '3 0 3 0',
                        defaults: {
                            labelWidth: 200, 
                            labelAlign: 'right',
                            fieldStyle: 'text-align: right; font-weight: bold; color: #0B333C;', 
                            width: 350
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'numberfield', 
                                    fieldLabel: 'Reportado en INR:',
                                    id: prototype.id + '-txtRecaudacionINR',
                                    decimalPrecision: 2, 
                                    alwaysDisplayDecimals: true,
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Reportado en USD:',
                                    id: prototype.id + '-txtRecaudacionUSD',
                                    decimalPrecision: 2,
                                    alwaysDisplayDecimals: true,
                                    labelWidth: 150,
                                }
                            ]
                        },

                        
                    ]
                }



                    ]
                },
                {xtype: 'tbspacer', height: 10},
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'

                },

                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 30',

                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});