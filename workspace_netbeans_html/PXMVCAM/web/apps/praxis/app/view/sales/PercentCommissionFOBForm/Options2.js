

Ext.define('Ext.Praxis.view.sales.PercentCommissionFOBForm.Options2', {
    xtype: 'panel',
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options2',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-first2',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous2',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next2',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last2',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page'

                        }
                        , {
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
                            id: prototype.id + '-btnSearch2',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter2',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter'
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnDisplay',
//                            icon: 'resources/img/botones/FalseChart.png',
//                            tooltip: 'Display Charts'
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel2',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear2',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAdd2',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack2',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back'
                        }
                    ]
                }
            ]
        }
    ]
});
