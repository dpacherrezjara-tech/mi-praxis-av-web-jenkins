Ext.define('Ext.Praxis.view.payments.CreditCardForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
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
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Credit Card Code',
                    id: prototype.id+'-cmbCode', 
                    disabled: false,
                    width: 300,
                    labelWidth: 120,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODE',
                    displayField: 'NAME',
                    hidden: false,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Currency ',
                    id: prototype.id+'-cmbCurrency',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    maxLength:3,
                    labelWidth: 120,
                    width: 190,
                    hidden: false,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Country',
                    id: prototype.id+'-cmbCountry',           
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    width: 350,
                    anyMatch: false,
                    labelWidth: 120,
                    hidden: false,
                    hiddenLabel: false,
                    margin: '0 40 0 0',
                },
                {
                    xtype: 'radiogroup',
                    id:prototype.id+'-rbgType',
                    hidden: false,
                    items: [
                        { boxLabel: '<b style="color:#148D28;">Credit Card</b>', inputValue: 'CARD', name: 'rbgType', checked: true, width: 100, },
                        {xtype: 'tbspacer', width: 20},
                        { boxLabel: '<b style="color:#148D28;">Commissions</b>', inputValue: 'COMM', name: 'rbgType', checked: false }
                    ],
                    listeners: {
                        change: 'cmbTranType_changeHandler' 
                    }
                }
                
            ]
            
            
        }
    ]
});



