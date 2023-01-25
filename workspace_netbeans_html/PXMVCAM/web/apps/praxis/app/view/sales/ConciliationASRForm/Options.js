Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.Options', {
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
            border: false,
            items: [
                {
                    xtype: 'radiogroup',
                    id:prototype.id+'-rdgVS',
                    padding: '7 0 0 0',
                    defaults: {
                        width: 150
                    },
                    items: [
                        { boxLabel: '<b style="color:#2B333C;">Interact vs PRAXIS</b>', inputValue: 'IP', name: 'rdgVS', checked: true },
                        { boxLabel: '<b style="color:#2B333C;">PRAXIS vs Interact</b>', inputValue: 'PI', name: 'rdgVS' }
                    ],
                    listeners: {change: 'rdgVS_changeHandler' }
                }
            ]
        },
        { xtype: 'tbspacer', width: 840 /*1350*/ },
        { xtype: 'tbspacer', width: 100, id:'espacio1', hidden: false },
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
                                click: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'btnExcel_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'btnBack_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});