Ext.define('Ext.Praxis.view.payments.RejectionsForm.Filters', {
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
//                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Rejection Code:',
                    id: prototype.id+'-cmbCode',                                   
                    enableKeyEvents: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,    
                    maxLength:4,
                    labelWidth: 120,
                    width: 190,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Country',
                    id: prototype.id+'-cmbCountry',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    width: 350,
                    anyMatch: false,
                    labelWidth: 120,
                    hidden: false,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id+'-cmbBank',
                    disabled: false,
                    width: 300,
                    labelWidth: 120,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    hidden: false,
                    hiddenLabel: false
                },
                { xtype: 'tbspacer', width: 60 },
                {
                    xtype: 'combo',
                    fieldLabel: 'Flag Adjus:',
                    id: prototype.id+'-cmbSADJUST',           
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 210,
                    labelWidth: 120,
                    fieldStyle: 'text-align: left;',
                    hidden: false,
                    listeners:{
//                        select: 'btnSearch_click',
                    }
                }
                
            ]
            
            
        }
    ]
});



