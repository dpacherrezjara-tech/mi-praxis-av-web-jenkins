Ext.define('Ext.Praxis.view.flown.AccountingCouponsForm.Options', {
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
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'btnFilter_click'
                            }
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnDisplay',
//                            icon: 'resources/img/botones/FalseChart.png',
//                            tooltip: 'Display Charts'
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            icon: 'resources/img/botones/txt.png',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'onOpenExportClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'btnClear_click'
                            }
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnAdd',
//                            iconCls: 'prx-icon-add',
//                            tooltip: 'New',
//                            listeners: {
//                                click: 'btnAdd_click'
//                            }
//                        },
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