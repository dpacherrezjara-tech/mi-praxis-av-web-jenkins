Ext.define('Ext.Praxis.view.payments.IntalmentSalesForm.Filters', {
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
                    xtype: 'label',
//                    html: '<strong style="color:#000;">Sales Date</strong>',
                    text: 'Sales Date',
//                    fieldStyle: 'text-align: right;',
                    labelAlign: 'right',
                    padding: '8px px 0px 0px',
                    hidden: false,
                    margin: '0 7 0 56 '
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
                    labelWidth: 40,
                    width: 150,
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
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
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
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
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
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
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
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
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
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
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbIN_FTE',
                    fieldLabel: 'Source Code',
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
                    labelWidth: 100,
                    width: 200,
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSTATT',
                    fieldLabel: 'Status',
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
                    width: 200,
                    anchor: '100%',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },

                {xtype: 'tbspacer', width: 130},
                {
                    xtype: 'radiogroup',
//                    fieldLabel: 'Transaction',
                    margin: '0px 5px 0px 10px',
                    id: prototype.id + '-rbgTDOC',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Sales   </strong>', name: 'rb', inputValue: 'S', width: 70, checked: true},
                        {boxLabel: '<strong style="color:#148D28" >Refund </strong>', name: 'rb', inputValue: 'R', width: 50}
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler'
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 0 0 25',
                    id: prototype.id + '-btnShowAuditTW',
                    text: 'Audit',
//                    themeColor: '#AEFF00',
//                    borderColor: '#D5E19C',
//                    color: '#0E93B0',
                    listeners: {
                        click: 'showAuditTW'
                    }
                    
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 0px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false
//                selectOnFocus: true
            },
            items: [
//                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Authorization Code:',
                    id: prototype.id + '-txtMERCHN',
//                    labelAlign: 'center',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 10,
                    labelWidth: 165,
                    width: 270,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'PNR:',
                    id: prototype.id + '-txtPNR',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 50,
                    width: 150,
                    margin: '0 7 0 160 ',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'CC Number:',
                    id: prototype.id + '-txtCard1',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 150,
                    width: 250,
                    margin: '0 7 0 75 ',
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'tarjeta_keyDownHandler'
                    }
                    
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '*****(*)',
                    id: prototype.id + '-txtCard2',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 4,
                    labelWidth: 55,
                    width: 120,
                    margin: '0 0 0 0 ',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarTAR_keyDownHandler',
                        specialkey: 'BuscarTAR_keyDownHandler'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Code Bank',
                    id: prototype.id + '-cmbBank',
                    queryMode: 'local',
                    margin: '0 0 0 10',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    fieldStyle: 'text-align: left;',
                    width: 250,
                    labelWidth: 85
//                    labelAlign: 'left'
                }
            ]
        }

    ]
});
