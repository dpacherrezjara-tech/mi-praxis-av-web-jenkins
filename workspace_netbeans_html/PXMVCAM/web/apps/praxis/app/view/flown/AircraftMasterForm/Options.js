Ext.define('Ext.Praxis.view.flown.AircraftMasterForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-search',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners:{
                                click: 'onSearchClick'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-filter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners:{
                                click: 'onFilterClick'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-display',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts',
                            listeners:{
                                click: 'onDisplayClick'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-excel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners:{
                                click: 'onExcelClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-clear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners:{
                                click: 'onClearClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-add',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New',
                            listeners:{
                                click: 'onAddClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-back',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners:{
                                click: 'onBackClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

