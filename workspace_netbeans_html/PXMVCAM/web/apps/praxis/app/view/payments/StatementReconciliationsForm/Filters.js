Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Filters', {
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
            margin: '0 0 0 40px',
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
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 5px',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateSel',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    fieldStyle: 'text-align: left;',
                    width: 110,
                    hidden: false
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
                    xtype: 'textfield',
                    fieldLabel: 'Merchant Number:',
                    id: prototype.id + '-txtMerchant',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength: 20,
                    labelWidth: 150,
                    width: 300,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'radiogroup',
//                    fieldLabel: 'Transaction',
                    margin: '0px 5px 0px 10px',
                    id: prototype.id + '-rbgType',
                    items: [
                        {boxLabel: '<strong style="color:#148D28" >Sales   </strong>', name: 'rb', inputValue: 'rbSALES', width: 70, checked: true},
//                        {boxLabel: '<strong style="color:#148D28" >Refund </strong>', name: 'rb', inputValue: 'rbREFUND', width: 50}
                    ],
                    listeners: {
                        change: 'imgByTDOC_clickHandler'
                    }
                }
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 40px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [
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
                    width: 353,
                    labelWidth: 85,
                    labelAlign: 'left'
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Account',
                    id: prototype.id + '-cmbEFTE',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name',
                    margin: '0 0 0 20',
                    fieldStyle: 'text-align: left;',
                    labelWidth: 60,
                    width: 276,
                    labelAlign: 'left'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Transaction',
                    id: prototype.id + '-cmbTTRAN',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name',
                    margin: '0 0 0 51',
                    labelWidth: 100,
                    width: 251,
                    labelAlign: 'left'
                }
            ]
        }

    ]
});
