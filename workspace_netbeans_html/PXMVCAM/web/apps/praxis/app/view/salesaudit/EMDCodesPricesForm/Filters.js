Ext.define('Ext.Praxis.view.salesaudit.EMDCodesPricesForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1200,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By',
                            padding: '4 0',
                            width: 74
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-Cmb_TypeFilter',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["C", "SubCode"], ["R", "RFIC"], ["D", "Description"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 120,
                            value: "C",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                change: 'Cmb_clickHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-HBox_Option01',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Sub Code:',
                                    padding: '4 0',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A2665RFIS',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 85,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-HBox_Option02',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: true,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'RFIC:',
                                    padding: '4 0',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A2665RFIC',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    width: 90,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-HBox_Option03',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: true,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Description:',
                                    padding: '4 0',
                                    width: 80
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-A2665Descr',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    width: 90,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});



