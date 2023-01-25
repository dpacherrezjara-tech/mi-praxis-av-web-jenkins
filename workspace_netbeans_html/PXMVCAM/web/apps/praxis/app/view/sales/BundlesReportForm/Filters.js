Ext.define('Ext.Praxis.view.sales.BundlesReportForm.Filters', {
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
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbTypeFilter',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "Select"],
                            ["1", "Ticket"]
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
                        change: 'onTypeFilterChange'
                    }
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'panel',
                    id: prototype.id + '-HBox_Option01',
                    layout: 'hbox',
                    hidden: false,
                    bodyStyle: 'background: transparent',
                    border: false,
                    items:[
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Ticket:</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            width: 80,
                            padding: '4px 7px 4px 10px'
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 85,
                            enableKeyEvents: true,
                            listeners:{
                                change: 'onUpperValue',
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

