Ext.define('Ext.Praxis.view.gerencial.GdsAuditForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        padding: '1px 1px 1px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-contenedor-filters',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        bodyStyle: 'background: transparent',
                                        border: false,
                                        padding: '5px'
                                    },
                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-contenedor-filters-form',
                                            layout: 'hbox',
                                            defaults: {
                                                padding: '5px 1px 5px 1px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-type',
                                                    store: Ext.create('Ext.data.Store', {
                                                        fields: [
                                                            {name: 'code', type: 'string'},
                                                            {name: 'description', type: 'string'}
                                                        ]
                                                    }),
                                                    fieldLabel: 'Type',
                                                    width: 150,
                                                    labelWidth: 40,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'description',
                                                    listeners: {
                                                        afterrender: 'onLoadComboType',
                                                        change: 'onCmbFilterByChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-year',
                                                    store: win.getStoreYear(false),
                                                    fieldLabel: 'Year',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    labelWidth: 40,
                                                    width: 100,
                                                    listeners: {
                                                        afterrender: 'onCmbYearAfterRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-month',
                                                    store: win.getStoreMonth(true),
                                                    fieldLabel: 'Month',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    labelWidth: 40,
                                                    width: 100,
                                                    listeners: {
                                                        afterrender: 'onCmbYearMonthRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-month_',
                                                    store: win.getStoreMonth(true),
                                                    fieldLabel: 'Month',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    labelWidth: 40,
                                                    width: 100,
                                                    listeners: {
                                                        afterrender: 'onCmbYearMonthRender_'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    id: prototype.id + '-chk-prodimp',
                                                    hideLabel: true,
                                                    boxLabel: 'Unproductive',
                                                    inputValue: '1',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onChangeUnproductive'
                                                    }
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    id: prototype.id + '-rbtn-iata',
                                                    hideLabel: true,
                                                    enableKeyEvents: true,
                                                    padding: 10,
                                                    listeners: {
                                                        change: 'onChangeiata'
                                                    },
                                                    items: [
                                                        {boxLabel: '<label>All</label>', inputValue: '1', name: 'rbtnGroupBy', checked: true, width: 40},
                                                        {boxLabel: '<label>IATA</label>', inputValue: '2', name: 'rbtnGroupBy', width: 60},
                                                        {boxLabel: '<label>No IATA</label>', inputValue: '3', name: 'rbtnGroupBy', width:80}                                                        
                                                    ]                                                                                                  
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});