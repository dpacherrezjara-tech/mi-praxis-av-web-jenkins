Ext.define('Ext.Praxis.view.payments.BanksCatalogForm.Filters', {
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
//                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Currency ',
                    id: prototype.id+'-cmbCode',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    maxLength:3,
                    labelWidth: 120,
                    width: 180,
//                    hidden: false,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id+'-cmbCountry',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    width: 350,
                    labelWidth: 80,
//                    hidden: false,
                    hiddenLabel: false
                }
                 ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id+'-cmbBank',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    width: 240,
                    labelWidth: 80,
//                    hidden: false,
                    hiddenLabel: false
                }
                
            ]
        }
    ]
});



