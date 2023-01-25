Ext.define('Ext.Praxis.view.interline.WorkProgressReportForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'combo',
            id: prototype.id + '-cmbSelectGrafic',
            store: new Ext.data.SimpleStore({
                fields: ['code', 'name'],
                data: [
                    [1, "Grafic 01"], [2, "Grafic 02"]
                ]
            }),
            queryMode: 'local',
            allowBlank: true,
            forceSelection: true,
            selectOnFocus: true,
            caseSensitive: false,
            autoSelect: true,
            editable: true,
            width: '10%',
            value: 1,
            hidden: true,
            typeAhead: true,
            valueField: 'code', displayField: 'name',
            enableKeyEvents: true,
            triggerAction: 'all',
            padding: '4 0',
            listeners: {
                focus: function (combo) {
                    combo.expand();
                },
                change: 'change_clickHandler'
            }
        },
        {xtype: 'tbspacer', width: 1018},
        {
            xtype: 'panel',
            id: prototype.id+'-boxPaginacion',
            hidden: true,
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page',
                            listeners: {
                                click: 'pagFirst'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page',
                            listeners: {
                                click: 'pagPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page',
                            listeners: {
                                click: 'pagNext'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page',
                            listeners: {
                                click: 'pagLast'
                            }
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin2',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 20},
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'imgSearch_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'imgFilter_clickHandler'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btnDisplay',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts',
                            listeners: {
                                click: 'imgChart_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'imgExcel_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'imgClear_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgBack_clickHandler'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});