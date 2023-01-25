Ext.define('Ext.Praxis.view.payments.FirstDataForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
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
                            ["FPRESENT", "Presentation Date"], ["SDATE", "Sale Date"]
                        ]
                    }),
                    labelWidth: 100,
                    width: 120,
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
                    id: prototype.id + '-cmbFindByCurrency',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"], ["ARS", "ARS"], ["USD", "USD"], ["UYU", "UYU"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: false,
                    value: "ARS",
                    fieldLabel: 'Currency',
                    labelWidth: 111,
                    labelAlign: 'right',
                    width: 184,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblMerchant',
                    text: 'Merchant: ',
                    width: 110,
                    style: 'text-align: right;',
                    padding: '10 0 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtMerch',
                    fieldStyle: 'text-align:center;',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    width: 100,
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'label',
                    id: prototype.id + '-lblSettlement',
                    text: 'Settlement: ',
                    width: 80,
                    style: 'text-align: right;',
                    padding: '10 0 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSettlement',
                    fieldStyle: 'text-align:center;',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    width: 100,
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'label',
                    text: 'Card Number:',
                    padding: '10 0 0 0',
                    style: 'text-align: right;',
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
                        keyup: 'tarjeta_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'label',
                    text: '*****(*)',
                    padding: '10 0 0 0',
                    style: 'text-align: center;',
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
                    width: 65,
                    enableKeyEvents: true,
                    /*listeners: {
                     keypress: 'buscarCard_keyDownHandler'
                     }*/
                },
            ]
        }
    ]
});
