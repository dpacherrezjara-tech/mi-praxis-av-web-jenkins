Ext.define('Ext.Praxis.view.payments.DataRequestedByDateForm.Filters', {
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
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'Reception Date',
                    labelWidth: 100,
                    width: 110,
                    anchor: '100%',
                    margin: '0 0 0 86'
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
                    anchor: '100%',
                    margin: '0 0 0 20'
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
                    id: prototype.id + '-cmbDateDay',
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
                    id: prototype.id + '-cmbDateToDay',
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
                    xtype: 'radiogroup',
                    margin: '0 0 0 40',
                    id: prototype.id + '-radiogroupType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Chargeback</strong>', name: 'rbgType', inputValue: 'cb', width: 100, checked: true},
                        {xtype: 'tbspacer', width: 30},
                        {boxLabel: '<strong style="color:#148D28" >Status Interact Sabre</strong>', name: 'rbgType', inputValue: 'ss', width: 150}
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler'
                    }
                }
                /*{
                    xtype: 'combo',
                    id: prototype.id + '-cmbCardType',
                    fieldStyle: 'text-align:left;',
                    fieldLabel: 'Card Type',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    hidden: false,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    emptyText: 'All',
                    labelWidth: 100,
                    width: 320,
                    listConfig: {minWidth: 250},
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
                    fieldStyle: 'text-align:left;',
                    fieldLabel: 'Status',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 65,
                    width: 200,
                    anchor: '100%'
                }*/
            ]
        },
       /* {
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
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merchant Nbr:',
                    id: prototype.id + '-txtMERCHN',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                    labelWidth: 165,
                    width: 350,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'txtFilterValue_keyDownHandler'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'IATA Nbr:',
                    id: prototype.id + '-txtSAGENT',
                    labelAlign: 'center',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 8,
                    labelWidth: 60,
                    width: 200,
                    margin: '0 0 0 92',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'txtFilterValue_keyDownHandler'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Card Number:',
                    id: prototype.id + '-txtCard1',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 150,
                    width: 250,
                    margin: '0 0 0 50',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'tarjeta_keyDownHandler'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '*****(*)',
                    id: prototype.id + '-txtCard2',
                    labelSeparator: '',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 4,
                    labelWidth: 55,
                    width: 150,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarCard_keyDownHandler'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id + '-cmbCountry',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    hidden: false,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    labelWidth: 45,
                    width: 270,
                    anchor: '100%',
                    margin: '0 0 0 53'
                }
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
                    xtype: 'textfield',
                    fieldLabel: 'Authorization:',
                    id: prototype.id + '-txtAUTHNBR',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 165,
                    width: 350,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'txtFilterValue_keyDownHandler'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank Code',
                    id: prototype.id + '-cmbBankCode',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    selectOnFocus: true,
                    hidden: false,
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    labelWidth: 92,
                    width: 300,
                    anchor: '100%',
                    margin: '0 0 0 60'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'CC Type',
                    id: prototype.id + '-cmbTCARD',
                    fieldStyle: 'text-align: left;',
                    labelAlign: 'center',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 74,
                    width: 192,
                    anchor: '100%',
                    margin: '0 0 0 58'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ticket:',
                    id: prototype.id + '-txtTicket',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 13,
                    labelWidth: 80,
                    width: 240,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarTKT_keyDownHandler'
                    }
                },
                {
                    xtype: 'radiogroup',
                    margin: '0 0 0 40',
                    id: prototype.id + '-rbgType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Clarifications   </strong>', name: 'rb', inputValue: 'ACLARACIONES', width: 100, checked: true},
                        {xtype: 'tbspacer', width: 30},
                        {boxLabel: '<strong style="color:#148D28" >Bank Notice </strong>', name: 'rb', inputValue: 'AVISOS', width: 100}
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler'
                    }
                }
            ]
        }
*/
    ]
});
