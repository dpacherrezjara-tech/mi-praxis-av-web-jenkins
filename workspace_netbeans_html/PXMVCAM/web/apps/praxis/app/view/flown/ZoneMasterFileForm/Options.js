


Ext.define('Ext.Praxis.view.flown.ZoneMasterFileForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + 'flown-zone-master-file-options',
    
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
                            id: 'vZoneMasterFile' + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page'

                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page'

                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page'

                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page'

                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: 'vZoneMasterFile' + '-paggin',
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
                            id: 'vZoneMasterFile' + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search'
                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter'
                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btnAdd',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New'
                        },
                        {
                            xtype: 'button',
                            id: 'vZoneMasterFile' + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back'
                        }
                    ]
                }
            ]
        }
    ]

});

