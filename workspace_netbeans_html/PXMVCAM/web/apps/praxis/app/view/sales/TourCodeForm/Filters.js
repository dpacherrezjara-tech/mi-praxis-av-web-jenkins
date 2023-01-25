Ext.define('Ext.Praxis.view.sales.TourCodeForm.Filters', {
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
                    html: '<strong style="color:#000;">Search By: </strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbOpcion',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["IT", "Tour Code"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 120,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
//                        afterrender: 'onCmbSearchAfterRender',
                        change: 'onCmbOpcionChange'
                    }
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCampo',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[a-zA-Z0-9]/,
                    maxLength: 15,
                    width: 150,
                    enableKeyEvents: true,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                }
            ]
        }
    ]
});

