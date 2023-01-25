Ext.define('Ext.Praxis.view.payments.SalesComplementAmexForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0 ',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFecFiltro',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code', displayField: 'name',
                            value: "SDATE",
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["SDATE", "Sale Date"]
                                ]
                            }),
                            labelWidth: 100,
                            width: 100,
                            anchor: '100%',
                            margin: '0 0 0 86',
                            listeners: {
                                change: 'cmbfiltro_clickHandler'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'From',
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
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
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
                            width: 70,
                            anchor: '100%'
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
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
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
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByFAMEX',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["X", "All"], ["", "Pending"], ["1", "Match"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "X",
                            fieldLabel: 'Complements vs AMEX',
                            labelWidth: 150,
                            labelAlign: 'right',
                            hidden: false,
                            width: 250,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindBySTVAL',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["X", "All"], ["", "Pending"], ["1", "Match"], ["2", "Accounted"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "X",
                            fieldLabel: 'Complements vs Sales',
                            labelWidth: 150,
                            labelAlign: 'right',
                            hidden: false,
                            width: 250,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroupTypeX',
                            width: 360,
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Plusgrade</b>', inputValue: 'P', name: 'rbgTypeX', checked: true},
                                {boxLabel: '<b style="color:#148D28;">Ligas de Pago</b>', inputValue: 'L', name: 'rbgTypeX'},
                                {boxLabel: '<b style="color:#148D28;">Tablet</b>', inputValue: 'T', name: 'rbgTypeX'},
                            ],
                            listeners: {
                                change: 'rbChangeType'
                            }
                        },
                    ]
                },
                {
                    xtype: 'form',
                    border: false,
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Ticket:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 13,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtField_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtField_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            text: 'Credit Card:',
                            padding: '8px 1px 2px 1px',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '******',
                            padding: '8px 1px 2px 1px',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 40,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuth',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByLigas',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"],  
                                    ["8133735688", "Ligas - 8133735688"], 
                                    ["9592174866", "Ligas - 9592174866"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            fieldLabel: 'Sales Merchant',
                            labelWidth: 100,
                            labelAlign: 'right',
                            //hidden: false,
                            width: 230,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindByTablet',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], 
                                    ["9352724851", "Tablet - 9352724851"], 
                                    ["8264209750", "Tablet - 8264209750"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            fieldLabel: 'Sales Merchant',
                            labelWidth: 100,
                            labelAlign: 'right',
                            //hidden: false,
                            width: 230,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                        },
                    ]
                },
            ]
        },
    ]
});
