Ext.define('Ext.Praxis.view.payments.MiscellaneousForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
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
                    listeners: {
                        change: 'btnSearch_click'
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtDescription1',
                    fieldLabel: 'Description 1',
                    allowBlank: true,
                    maxLength: 50,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    labelWidth: 90,
                    width: 260,
                    fieldStyle: 'text-align: left;',
                    hidden: false,
                    listeners: {
                        keypress: 'eventKey'
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtDescription2',
                    fieldLabel: 'Description 2',
                    allowBlank: true,
                    maxLength: 50,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    labelWidth: 90,
                    width: 260,
                    fieldStyle: 'text-align: left;',
                    hidden: false,
                    listeners: {
                        keypress: 'eventKey'
                    },
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtDescription3',
                    fieldLabel: 'Description 3',
                    allowBlank: true,
                    maxLength: 50,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: true,
                    labelWidth: 90,
                    width: 260,
                    fieldStyle: 'text-align: left;',
                    hidden: false,
                    listeners: {
                        keypress: 'eventKey'
                    },
                    margin: '0 10 0 0'
                },
            ]
        }
    ]
});



