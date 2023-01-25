Ext.define('Ext.Praxis.view.sales.CalendarASRForm.Filters', {
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
                    html: '<strong style="color:#000;">Processing Period:</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxDateYear',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    width: 75,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxDateMonth',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    width: 65,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 344 },
                {
                    xtype: 'button',
                    id:prototype.id+'-btnAutoGenerar',
                    text : '<span style="font-weight:bold;">Auto Generate</span>',
//                    text : '<span style="font-weight:bold; color:white;background-color:#02507A">Clone calendar</span>',
//                    style: "background-color:#02507A;",
                    listeners:{
                        click: 'onAutoGenerarClick'
                    }
                }
            ]
        }
    ]
});

