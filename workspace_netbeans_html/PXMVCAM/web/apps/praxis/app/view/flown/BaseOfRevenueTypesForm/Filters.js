Ext.define('Ext.Praxis.view.flown.BaseOfRevenueTypesForm.Filters', {
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
//                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Enter Parameter</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtIN_A051KEY1',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 2,
                    width: 45,
                    enableKeyEvents: true,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'TIPO (..)',
                    fieldStyle: 'text-align: center;',
                    hidden: true,
//                    align: 'center',
                    padding: '8px 7px 8px 10px'
                }
            ]
        }
    ]
});

