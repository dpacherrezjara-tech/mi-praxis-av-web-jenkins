Ext.define('Ext.Praxis.view.payments.AccountingPlanForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
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
            hidden: true,
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: left;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Transaction Code',
                    id: prototype.id+'-cmbTrans',
                    margin: '0 0 0 70',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 110,
                    width: 270
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Type Register',
                    id: prototype.id+'-cmbTReg',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 110,
                    width: 200
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Client Code',
                    id: prototype.id+'-txtRejCode',                                   
                    allowBlank: true,
                    maskRe: /[0-9a-zA-Z]/,
                    enforceMaxLength: true,
                    maxLength:5,
                    labelWidth: 100,
                    width: 160,
                    enableKeyEvents: true,
                    fieldStyle: 'text-align: center;',
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id+'-cmbCountry',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    labelWidth: 80,
                    width: 290
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id+'-cmbBank',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    labelWidth: 80,
                    width: 250
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Policy Nbr',
                    id: prototype.id+'-txtPolicy',                                   
                    allowBlank: true,
                    maskRe: /[0-9a-zA-Z]/,
                    enforceMaxLength: true,
                    maxLength:5,
                    labelWidth: 100,
                    width: 170,
                    enableKeyEvents: true,
                    fieldStyle: 'text-align: center;',
                    listeners: {
                        keypress: 'eventKey'
                    }
                }
            ]
        }
    ]
});
