Ext.define('Ext.Praxis.view.payments.MiscellaneousForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 15px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbTable',
                    fieldLabel: 'Table',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    fieldStyle: 'text-align: left;',
                    labelWidth: 60,
                    width: 130,
                    hidden: false,
                    listeners:{
                         change: 'btnSearch_click'
                     }
                },
            ]
        }
    ]
});



