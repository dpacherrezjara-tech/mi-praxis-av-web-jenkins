Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters_1', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters2',
//    border: true,
    bodyStyle: 'background-color: #ffffff;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter2',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: left;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    items: [
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'radiogroup',
//                            fieldLabel: 'Sumary',
                            padding: '0 10 0 50',
                            columns: 3,
//                            width: '120',
                            
//                            hidden: true,
                            vertical: true,
                            value: '1',
                            items: [
                                
                                { boxLabel: '<b> Agents</b>',  name: 'opcion', inputValue: '1', checked: true,padding: '0 10 0 50'},
                                { boxLabel: '<b> Days</b>', name: 'opcion', inputValue: '2', padding: '0 10 0 50'  },
                            ],
                            listeners: {
                                change: 'rgChangeReport'
                            }
                        },
                        {xtype: 'tbspacer', width: 900},
                        {
                            xtype: 'label',
                            text: 'TOP AMOUNTS',
                            id: prototype.id + '-lblTOP',
                            padding: '4 10 0 20',
                            width: 150,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTOP',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["5", "TOP 5"], ["10", "TOP 10"], ["15", "TOP 15"], ["20", "TOP 20"],["25", "TOP 25"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
                            value: "10",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                  

                    ]
                },
            ]
        }
    ]
});
