Ext.define('Ext.Praxis.view.payments.SalesReconciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1700,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
//            layout: {
//                type: 'vbox',
//                align: 'center' // Alinea todos los elementos al centro horizontalmente
//            },
            defaults: {
                border: false
            },
            items: [
                
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbFecFiltro',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["SDATE", "Sales Date"], ["FCONT", "Accounting Date"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 105,
                            value: "SDATE",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                select: 'selectFecFiltro',
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 120,
                            labelWidth: 45,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
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
                            id: prototype.id+'-cmbDateFromMonth',
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
                            //cmbDateFromDay
                            id: prototype.id+'-cmbDateDay',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60},
                            listeners: {
                                change: 'cbxDateFromDay_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToYear',
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
                            maskRe: /[0-9]/,
                            listeners: {
                                change: 'cbxDateToYear_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToMonth',
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
                            enforceMaxLength: true,
                            listeners: {
                                change: 'cbxDateToMonth_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            //cmbDateToDay
                            id: prototype.id+'-cmbDateToDay',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable:false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60}
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', width: 10},
//                        {
//                            xtype: 'label',
//                            text: 'FOP:',
//                            padding: '3 0',
//                            width: 74
//                        },
//                        {
//                            xtype:'combo',
//                            id: prototype.id+'-cmbFOP',
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "All"], ["CC", "Credit Card"], ["CA", "Cash"]
//                                ]
//                            }),
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 100,
//                            value: "CC",
//                            typeAhead: true,
//                            valueField: 'code', displayField: 'name',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            listeners:{
//                                change: 'cbxFOPAC_changeHandler'
//                            }
//                        },
//                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Source:',
                            padding: '3 0',
                            width: 40
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbSource',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["AVCAO", "AVCAO"], ["BSP", "BSP"], ["BSPCO", "BSPCO"]
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
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                            }
                        },
                        {xtype: 'tbspacer', width: 29},
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '3 0',
                            width: 57
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCountry',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 251,
                            typeAhead: true,
                            valueField: 'A006PAIS', displayField: 'A006NOMBRE',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                            }
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            text: 'PNR: ',
                            padding: '3 0',
                            width: 40,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'PNR'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtPNR',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 6,
                            width: 70,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
//                        {xtype: 'tbspacer', width: 30},
//                        {
//                            xtype: 'label',
//                            text: 'ACCB Type:',
//                            padding: '3 0',
//                            width: 94
//                        },
//                        {
//                            xtype:'combo',
//                            id: prototype.id+'-',
//                            hidden:true,
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "All"], ["B", "Billed"], ["N", "Not Billed"], ["L", "Local"], ["X", "BSP Billed"]
//                                ]
//                            }),
//                            queryMode: 'local',
//                            allowBlank: false,
//                            forceSelection: true,
//                            selectOnFocus: true,
//                            caseSensitive: false,
//                            autoSelect: true,
//                            editable: true,
//                            width: 100,
//                            value: "",
//                            typeAhead: true,
//                            valueField: 'code', displayField: 'name',
//                            enableKeyEvents: true,
//                            triggerAction: 'all',
//                            listeners:{
//                            }
//                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ticket Number:',
                            padding: '3 0',
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtTicket',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
//                            maxLength: 13,
                            width: 123,
                            enableKeyEvents: true,
                            listeners:{
                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'CC Number:',
                            padding: '3 0',
                            width: 102,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtCard1',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 6,
                            width: 85,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler',
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
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
                            id: prototype.id+'-txtCard2',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 4,
                            width: 65,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 16},
                        {
                            xtype: 'label',
                            text: 'Authorization :',
                            padding: '3 0',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Authorization Number'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtAUTHNBR',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[a-zA-Z0-9]/,      
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'CC Type:',
                            padding: '3 0',
                            width: 66,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Credit Card Type'
                            }
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCardType',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 252,
                            typeAhead: true,
                            valueField: 'CODE', displayField: 'NAME',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                            }
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            text: 'Agent: ',
                            padding: '3 0',
                            width: 40,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Agent'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtSAGENT',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            width: 70,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Doc. Type:',
                            padding: '3 0 0 0',
                            width: 60,
                            
                        },
                        {xtype: 'tbspacer', width: 39},
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
                            width: 123,
                            hidden: false,
                            value: 'S',
                             store: {
                                fields: ['value', 'description'],
                                data: [
                                    
                                    { value: 'S', description: 'SALES' },
                                    { value: 'D', description: 'DEBITS' },
                                    { value: 'R', description: 'REFUND' },
                                    { value: 'C', description: 'CHBCK' },
                                    { value: 'A', description: 'ACREDIT' },
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 35},
                        {
                            xtype: 'label',
                            text: 'Status :',
                            padding: '3 0',
                            hidden: false,
                            width: 74,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Status'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbStatus',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'description'],
                                data: [
                                    ["", "All"], ["1", "Match"], ["2", "Sales Without Liqui."],["5", "Match Manual"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 150,
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
                            xtype: 'label',
                            text: 'Amount :',
                            padding: '3 0',
                            hidden: false,
                            width: 74,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Amount'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAMOUNT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/, // Permitir solo números y el punto decimal
                            maxLength: 20,
                            hidden: false,
                            width: 192,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function(field) {
                                    var value = field.getValue().replace(/[^\d.]/g, '');
                                    var parts = value.split('.');
                                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    if (parts[1] && parts[1].length > 2) { 
                                        parts[1] = parts[1].substring(0, 2);    
                                    }
                                    field.setValue(parts.join('.'));
                                },
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'label',
                            text: 'Deb. Type',
//                            style: 'font-weight:bold;color:#0B333C;',
                            width: 60,
                            hidden: true,
                            id: prototype.id + '-lblTDOC'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDebitType',
                            style: 'font-weight:bold;color:#0B333C;',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            width: 254,
                            hidden: true,
                            hiddenLabel: false
                        },
                        {
                            xtype: 'label',
                            text: 'Merchant :',
                            padding: '3 0',
                            hidden:true,
                            width: 74,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Merchant Number'
                            }
                        },
                        {xtype: 'tbspacer', width: 70},
                        
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtMERCHN',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9a-zA-Z]/,      
                            maxLength: 20,
                            width: 192,
                            hidden:true,
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id+'-chkADYEN',
                            boxLabel: '<b>ADYEN</b>',
                            checked: false,
                            hidden:true,
                            width: 90,
                            listeners:{
                                change: 'btnSearch_click'
                            }
                        },                        
                        {xtype: 'tbspacer', width: 10, hidden:true},
                        {
                            xtype: 'radiogroup',
                            hidden:true,
                            id:prototype.id+'-rbgType',
                            items: [
                                { boxLabel: '<b style="color:#148D28;">Sales</b>', inputValue: 'Sales', name: 'rbgType', checked: true },
                                {xtype: 'tbspacer', width: 20},
                                { boxLabel: '<b style="color:#148D28;">Refund</b>', inputValue: 'Refund', name: 'rbgType' }
                            ],
                            listeners: {change: 'cmbTranType_changeHandler' }
                        }
                    ]
                }
            ]
        }
    ]
});



