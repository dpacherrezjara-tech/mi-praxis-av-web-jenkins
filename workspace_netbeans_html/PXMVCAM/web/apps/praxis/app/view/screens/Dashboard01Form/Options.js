Ext.define('Ext.Praxis.view.screens.Dashboard01Form.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        //pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            width: 150,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch_2',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
//                            listeners: {
//                                click: 'imgSearch_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter_2',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
//                            listeners: {
//                                click: 'imgFilter_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnDisplay_2',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts',
//                            listeners: {
//                                click: 'btnDisplay_click'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel_2',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
//                                click: 'imgExcel_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear_2',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
//                            listeners: {
//                                click: 'imgClear_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAdd_2',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New',
                            hidden: true,
//                            listeners: {
//                                click: 'btnAdd_click'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack_2',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgBack_clickHandler'
                            }
                        }
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 1230},
        {
            xtype: 'panel',
            id: prototype.id + '-boxPaginacion',
            hidden: false,
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
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin3',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin4',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin5',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-pagginGDS',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-pagginGDStkt',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-pagginCabin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-pagginAlliance',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-pagginRoutingType',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_loadSalesAgent',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchFlownFlight',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchByCityPair',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchByFlightProfitability',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_loadCityPair',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchDetail',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchDetByCoupon',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin_searchByCabin',
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
            width: 150,
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
//                            listeners: {
//                                click: 'imgSearch_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
//                            listeners: {
//                                click: 'imgFilter_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnDisplay',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts',
//                            listeners: {
//                                click: 'btnDisplay_click'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
//                                click: 'imgExcel_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
//                            listeners: {
//                                click: 'imgClear_clickHandler'
//                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAdd',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New',
                            hidden: true,
//                            listeners: {
//                                click: 'btnAdd_click'
//                            }
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