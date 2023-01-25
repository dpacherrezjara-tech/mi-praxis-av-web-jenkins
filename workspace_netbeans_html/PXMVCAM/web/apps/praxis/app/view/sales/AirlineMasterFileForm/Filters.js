Ext.define('Ext.Praxis.view.sales.AirlineMasterFileForm.Filters', {
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
//                    fieldStyle: 'text-align: center;',
//                    padding: '8px 7px 8px 10px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype:'combo',
//                    store: Ext.create('Ext.Praxis.store.sales.AirlineMasterFile.SearchBy'),
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "Select"],
                            ["C", "Numeric Code"],
                            ["A", "Code Alpha"],
                            ["N", "Legal Name"]
                        ]
                    }),
                    id: prototype.id + '-cmbOpcion',
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
                { xtype: 'tbspacer', width: 5 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCampo',
                    fieldStyle: 'text-align:left',
//                    enforceMaxLength: true,
//                    maxLength: 3,
                    width: 109,
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

