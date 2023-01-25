Ext.define('Ext.Praxis.view.sales.CityMasterFileForm.Filters', {
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
                anchor: '100%',
                padding: '5 1'
            },
            items: [
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By: </strong>',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cbxFiltro',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["CODECIU", "City Code"], ["NAME", "City Name"],
                            ["CODEAERO", "Airport Code"], ["CODEPAIS", "Country Code"]
                        ]
                    }),
                    queryMode: 'local',
                    allowBlank: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 120,
                    value: "CODECIU",
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners:{
                        focus: function (combo) {
                            combo.expand();
                        },
                        change: 'cbxFiltro_changeHandler'
                    }
                },
                { xtype: 'tbspacer', width: 5 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSearch',
                    fieldStyle: 'text-align:left',
                    enforceMaxLength: true,
                    width: 79,
                    enableKeyEvents: true,
                    listeners:{
                        afterrender: function (combo, eOpts) {
                            combo.inputEl.dom.maxLength=3;
                        },
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                }
            ]
        }
    ]
});

