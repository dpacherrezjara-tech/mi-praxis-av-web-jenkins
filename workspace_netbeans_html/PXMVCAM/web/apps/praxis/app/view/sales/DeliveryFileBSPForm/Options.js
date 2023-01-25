Ext.define('Ext.Praxis.view.sales.DeliveryFileBSPForm.Options', {
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
            border: true,
            items: [
                {
                    xtype: 'toolbar',
//                    cls: 'x-toolbar-pag',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnDowload',
                            icon: 'resources/img/botones/download.png',
                            tooltip: 'Load More',
                            border: false,
                            listeners: {
                                click: 'pagNext'
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
        {xtype: 'tbspacer', width: 70},
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
                            id: prototype.id + '-btnTexto',
                            icon: 'resources/img/botones/txt.png',
                            tooltip: 'Export to Txt',
                            listeners: {
                                click: 'imgTxt_clickHandler'
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