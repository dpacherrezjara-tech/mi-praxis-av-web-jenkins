Ext.define('Ext.Praxis.view.payments.RejectionReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter',
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
                    id: prototype.id + '-cmbDate',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    padding: '5px 15px 5px 30px',
                    width: 100
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
                    labelWidth: 50,
                    width: 130,
                    anchor: '100%',
                    listeners: {
                        change: 'cbxDateFromYear_changeHandler'
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
                    width: 60,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    padding: '5px 1px 5px 12px',
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
                    labelWidth: 50,
                    width: 130,
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
                    width: 60,
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Merchant Number:',
                    id: prototype.id + '-txtAFILN',
                    padding: '5px 1px 5px 30px',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 7,
                    labelWidth: 120,
                    width: 200,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Authorization Code:',
                    id: prototype.id + '-txtCODAUT',
                    padding: '5px 1px 5px 30px',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 120,
                    width: 200,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'CC Number:',
                    id: prototype.id + '-txtACCOUNT',
                    padding: '5px 1px 5px 25px',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 16,
                    labelWidth: 80,
                    width: 210,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 10px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: left;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Rejection Code',
//                    style: 'font-weight:bold;color:#121E31;',
                    width: 102,
                    padding: '4 0',
                    margin: '0 0 0 160'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCODREJ',
                    padding: '1px 1px 1px 1px',
                    queryMode: 'local',
                    valueField: 'CODEREJ',
                    displayField: 'DESCREJ',
                    editable: false,
                    width: 275,
                    selectOnFocus: true,
                    listConfig: {minWidth: 365}
                }
            ]
        }

    ]
});
