Ext.define('Ext.Praxis.view.payments.EmailsForm.Filters', {
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
                    id: prototype.id + '-cmbCodes',
                    fieldLabel: 'Codes',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    fieldStyle: 'text-align: left;',
                    labelWidth: 150,
                    width: 400,
                    hidden: true,
                    listeners:{
                         change: 'btnSearch_click'
                     }
                },
                
            ]
        }
    ]
});



