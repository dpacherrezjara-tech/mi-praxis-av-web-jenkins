Ext.define('Ext.Praxis.view.sales.ProvisosForm.Filters', {
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
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Sector',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'label',
                    html: 'From',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856TRADES',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 3,
                    width: 40,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'label',
                    html: 'To',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856TRAHAS',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 3,
                    width: 40,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Airline',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856LINAER',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 2,
                    width: 48,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Validity from',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856VIGDES',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 6,
                    width: 75,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Class',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856CLASE',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 1,
                    width: 37,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Subtype Rate (N/S)',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtA856TIPTAR',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 1,
                    width: 93,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                }
            ]
        }
    ]
});

