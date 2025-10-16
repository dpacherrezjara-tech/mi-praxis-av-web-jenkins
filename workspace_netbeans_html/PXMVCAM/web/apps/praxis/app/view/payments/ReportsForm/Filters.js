Ext.define('Ext.Praxis.view.payments.ReportsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        width: '100%'
    },
    items: [
        {
            xtype: 'container',
            id: prototype.id + '-filterMain',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            style: 'padding: 10px 0 10px 15px;',
            items: [
                // --- FILA 1 (fechas y search) ---
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    margin: '0 0 10 0',
//                    defaults: { margin: '0 10 0 0' },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Search By',
                            id: prototype.id + '-cmbFecFiltro',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 170,
                            labelWidth: 60,
                            value: "SDATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
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
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 40,
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
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 40,
                            anchor: '100%',
                            listener: {
                                change: 'onDateToDaySelect',
                                expand: 'eventSelectToDay'
                            },
                            margin: '0 10 0 0' 
                        },
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
                            labelWidth: 60,
                            typeAhead: true,
                            valueField: 'A4451KEY2',
                            displayField: 'A4451KEY3',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            margin: '0 10 0 0' 
                        },
                        {
                                xtype: 'displayfield',
                                id: prototype.id + '-lblExchangeMessage2',
                                fieldLabel: 'Estado tipo cambio',
                                labelWidth: 110,
                                hidden:true,
                                width: 640,
                                labelStyle: 'font-size: 12px; text-align: left;',
                                fieldStyle: 'font-size: 12px; color: #444; padding-bottom: 8px;',
                                value: '', // Se llena dinámicamente con el mensaje
                                listeners: {
                                    afterrender: function (cmp) {
                                        // Creamos el tooltip vacío al inicio
                                        cmp.tooltip = Ext.create('Ext.tip.ToolTip', {
                                            target: cmp.getEl(),
                                            trackMouse: true,
                                            maxWidth: 600,
                                            dismissDelay: 0,
                                            html: '' // se actualiza luego
                                        });
                                    }
                                }
                            },
                        // --- FILA 2 (country, cards, author) ---
                {
                    xtype: 'container',
                    id: prototype.id + '-containerFilters1',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    margin: '0 0 10 0',
                    defaults: { margin: '0 10 0 0' },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCountry',
                            fieldLabel: 'Country',
                            queryMode: 'local',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 200,
                            labelWidth: 50,
                            typeAhead: true,
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 200},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Card Number',
                            id: prototype.id + '-txtCard1',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 140,
                            labelWidth: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'tarjeta_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCard2',
                            fieldLabel: '*****(*)',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                            },
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 100,
                            labelWidth: 55,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Author. Cod',
                            id: prototype.id + '-txtAUTHOC',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 8,
                            width: 140,
                            labelWidth: 70,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        
                        {
                            xtype: 'combo',
                            fieldLabel: 'Bank',
                            id: prototype.id + '-cmbBank',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            queryMode: 'local',
                            editable: true,
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            emptyText: 'All',
                            labelWidth: 40,
                            width: 180
                        }
                    ]
                },
                    ]
                },

                // --- FILA 3 (bank, status, tdic, debit) ---
                {
                    xtype: 'container',
                    id: prototype.id + '-containerFilters2',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    defaults: { margin: '0 10 0 0' },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTDOC',
                            fieldLabel: 'Dcoument Type',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            width: 230,
                            labelWidth: 90,
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            value: "",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDebitType',
                            fieldLabel: 'Debit Type',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            style: 'font-weight:bold;color:#0B333C;',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            width: 200,
                            labelWidth: 70,
                            hiddenLabel: false
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSTVAL',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            labelWidth: 40,
                            width: 160,
                            value: "",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 150},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {
                                xtype: 'displayfield',
                                id: prototype.id + '-lblExchangeMessage',
                                fieldLabel: 'Estado tipo cambio',
                                labelWidth: 110,
                                width: 700,
                                labelStyle: 'font-size: 12px; text-align: left;',
                                fieldStyle: 'font-size: 12px; color: #444; padding-bottom: 8px;',
                                value: '', // Se llena dinámicamente con el mensaje
                                listeners: {
                                    afterrender: function (cmp) {
                                        // Creamos el tooltip vacío al inicio
                                        cmp.tooltip = Ext.create('Ext.tip.ToolTip', {
                                            target: cmp.getEl(),
                                            trackMouse: true,
                                            maxWidth: 600,
                                            dismissDelay: 0,
                                            html: '' // se actualiza luego
                                        });
                                    }
                                }
                            }

                    ]
                }
            ]
        }
    ]
});
