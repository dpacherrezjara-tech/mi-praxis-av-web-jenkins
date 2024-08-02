Ext.define('Ext.Praxis.view.payments.StatementRulesForm.Filters', {
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
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Core Process:',
                            padding: '3 0',
                            width: 80
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCOREP',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 150,
                            typeAhead: true,
                            valueField: 'VALUE',
                            displayField: 'NAME',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        }
                    ]
                },
            ]
        }
    ]
});



