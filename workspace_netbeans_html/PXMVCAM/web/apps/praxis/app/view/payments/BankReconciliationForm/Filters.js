Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '0 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxSearchFilter',
            margin: '0 0',
            border: false,
            width: 1900,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '5 0 0 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Search By:',
                            padding: '3 0',
                            width: 65
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 120,
                            labelWidth: 45,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
//                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            listeners: {
                                change: 'cbxDateFromYear_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
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
                        {xtype: 'tbspacer', width: 10},
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
                        {xtype: 'tbspacer', width: 15},

                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 106,
                            labelWidth: 31,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 65,
//                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {xtype: 'tbspacer', width: 10},
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
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 60
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
                        {xtype: 'tbspacer', width: 30, hidden: true},
                        {
                            xtype: 'label',
                            text: 'Code Bank:',
                            hidden: true,
                            padding: '3 0',
                            width: 80
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBank',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 190,
                            hidden: true,
                            typeAhead: true,
                            valueField: 'CODEBANK',
                            displayField: 'IN_CODE_IN_NAME',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Card Number:',
                            padding: '3 0',
                            width: 80,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCard1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 85,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'tarjeta_keyDownHandler',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 8},
                        {
                            xtype: 'label',
                            text: '*****(*)',
                            padding: '3 0',
                            width: 65,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCard2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Author. Cod : ',
                            padding: '3 0',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAUTHOC',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 8,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Business:',
                            padding: '3 0',
//                            hidden:true,
                            width: 65
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbNEGOC',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            listConfig: {maxHeight: 130},
//                            width: 66,
//                            typeAhead: true,
////                            hidden:true,
//                            valueField: 'code',
//                            displayField: 'name',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbNEGOC',
//                            fieldLabel: 'Doc',
                            width: 66,
                            emptyText: 'All',
                            value: '',
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: true,
                            forceSelection: true,

                        },
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Merchant Number :',
                            padding: '3 0',
                            hidden: true,
                            width: 120,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Merchant Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtMERCHN',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 20,
                            hidden: true,
                            width: 200,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'IATA Number:',
                            padding: '3 0',
                            hidden: true,
                            width: 100,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSAGENT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            hidden: true,
                            maxLength: 8,
                            width: 120,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtFilterValue_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Card Type:',
                            hidden: true,
                            padding: '3 0',
                            width: 80,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Credit Card Type'
//                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCardType',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            hidden: true,
                            listConfig: {maxHeight: 111},
                            width: 240,
                            typeAhead: true,
                            valueField: 'CODE',
                            displayField: 'NAME',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Source:',
                            padding: '3 0',
                            hidden: true,
                            width: 120
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFTE',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            listConfig: {maxHeight: 111},
                            width: 100,
                            typeAhead: true,
                            hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
//                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'PNR :',
                            padding: '3 0',
                            hidden: true,
                            width: 40,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Merchant Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 6,
                            width: 60,
                            enableKeyEvents: true,
                            hidden: true,
                            listeners: {
                                keypress: 'BuscarPNR_keyDownHandler'
                            }
                        },
//                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkADYEN',
                            hidden: true,
                            boxLabel: '<b>ADYEN</b>',
                            checked: false,
                            width: 90,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
//                        {xtype: 'tbspacer', width: 80},
                        {
                            xtype: 'radiogroup',
                            hidden: true,
                            id: prototype.id + '-rbgType',
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Sales</b>', inputValue: 'rbSALES', name: 'rbgType', checked: true},
                                {xtype: 'tbspacer', width: 20},
                                {boxLabel: '<b style="color:#148D28;">Refund</b>', inputValue: 'rbREFUND', name: 'rbgType'}
                            ],
                            listeners: {
                                change: 'cmbTranType_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Doc. Type:',
                            padding: '3 0 0 0',
                            width: 60,
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTDOC',
//                            fieldLabel: 'Doc',
                            store: {
                                fields: ['value', 'name'],
                                data: [
                                    {value: 'S', name: 'Sales'},
                                    {value: 'D', name: 'Debito'},
                                    {value: 'R', name: 'Refund'},
                                    {value: 'C', name: 'Chargbck'},
                                    {value: 'A', name: 'Acredit'}
                                ]
                            },
                            width: 100,
                            emptyText: 'All',
                            value: 'S',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: true,
                            forceSelection: true,

                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbTDOC',
//                            triggerAction: 'all',
//                            enableKeyEvents: true,
//                            readOnly: false,
//                            editable: true,
//                            valueField: 'value',
//                            displayField: 'description',
//                            fieldStyle: 'text-align: left;',
//                            width: 100,
//                            hidden: false,
//                            value: 'S',
//                            store: {
//                                fields: ['value', 'description'],
//                                data: [
//
//                                    {value: 'S', description: 'SALES'},
//                                    {value: 'D', description: 'DEBITS'},
//                                    {value: 'R', description: 'RFND'},
//                                    {value: 'C', description: 'CHARGEBAK'},
//                                    {value: 'A', description: 'ACREDIT'}
//                                ]
//                            }
//                        },
                        {xtype: 'tbspacer', width: 10},

//                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            text: 'Processor:',
//                            padding: '3 0 0 30 ',
                            width: 70,
                            //                    hidden:true
                        },

//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbCOREP',
//                            queryMode: 'local',
//                            allowBlank: false,
//                            //                    hidden: true,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 130,
//                            typeAhead: true,
//                            valueField: 'VALUE',
//                            displayField: 'NAME',
//                            listConfig: {maxHeight: 111},
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                        },


                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCOREP',
//                            fieldLabel: 'Doc',
                            width: 130,
                            emptyText: 'All',
                            value: [],
                            displayField: 'NAME',
                            valueField: 'VALUE',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: true,
                            forceSelection: true,

                        },

                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
//                            style: 'font-weight:bold;color:#0B333C;',
                            padding: '3 0 0 10',
                            text: 'Agent:',
                            width: 55
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAGENCY',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            width: 85,
                            enableKeyEvents: true,
                            listeners: {
//                                keypress: 'BuscarSAGENT_keyDownHandler',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Status :',
                            padding: '3 0',
                            hidden: false,
                            width: 64,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Status'
                            }
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbStatus',
//                            
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 100,
//                            value: "",
//                            hidden: false,
//                            typeAhead: true,
//                            valueField: 'value', displayField: 'description',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            listeners: {
//                            }
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatus',
//                            fieldLabel: 'Doc',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["1", "Match"], ["3", "Settlement Without Sales"], ["5", "Match Manual"]
                                ]
                            }),
                            width: 100,
                            emptyText: 'All',
                            value: '',
                            displayField: 'description',
                            valueField: 'value',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: true,
                            forceSelection: true,

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Amount :',
                            padding: '3 0',
                            hidden: false,
                            width: 62,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Amount'
                            },
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAMOUNT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/, // Permitir solo números y el punto decimal
                            maxLength: 20,
                            hidden: false,
                            width: 120,
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
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Source:',
                            padding: '3 0',
                            width: 55
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbSource',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "All"], ["A", "ARC"], ["B", "BSP"], ["S", "ASR"], ["T", "TC"]
//                                ]
//                            }),
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 80,
//                            value: "",
//                            typeAhead: true,
//                            valueField: 'code', displayField: 'name',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            listeners: {
//                            }
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
//                            fieldLabel: 'Doc',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["A", "ARC"], ["B", "BSP"], ["S", "ASR"], ["T", "TC"]
                                ]
                            }),
                            width: 80,
                            emptyText: 'All',
                            value: '',
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            multiSelect: true,
                            forceSelection: true,

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
//                            style: 'font-weight:bold;color:#0B333C;',
                            padding: '3 0 0 0',
                            text: 'BPO Comment:',
                            width: 100
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCOMENTF',
                            margin: '5 0 0 0',
                            style: 'font-weight:bold;color:#0B333C;',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            width: 180,
                            labelWidth: 10,
                            hidden: false,
                            hiddenLabel: false
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Doc Sap Bank:',
                            padding: '3 0 0 0',
                            width: 100,
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
//                            listeners: {
//                                keypress: 'eventKey_BANDOC'
//                            },
                            listeners: {
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
//                        {
//                            xtype: 'checkboxfield',
//                            id: prototype.id + '-chkValidationInterface',
//                            labelStyle: 'color:#378BCC;font-weight:bold;',
//                            width: 100,
//                            labelWidth: 50,
//                            boxLabel: 'Validation <br> Interface',
//                            inputValue: '1',
////                            checked   : true,
//                            listeners: {
//                                change: 'btnSearch_click'
//                            }
//                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkValidationInterface',
                            boxLabel: 'Validation <br> Interface',
                            name: 'validationOption',
                            inputValue: '1',
                            uncheckedValue: '0',
                            listeners: {
                                change: 'btnSearch_click' // Mismo listener para manejar el cambio
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            fieldLabel: 'Avianca <br> Group',
                            hidden: false,
                            labelStyle: 'text-align: left;',
                            fieldStyle: 'text-align: left;',
                            width: 160,
                            labelWidth: 50,
                            hidden: true,
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
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbAGENCY',
//                            margin: '5 0 0 0',
//                            style: 'font-weight:bold;color:#0B333C;',
//                            fieldStyle: 'text-align:left;',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            valueField: 'CODE',
//                            displayField: 'NAME',
//                            width: 380,
//                            labelWidth: 10,
//                            hidden: false,
//                            hiddenLabel: false
//                        },
                    ]
                }
            ]
        }
    ]
});



