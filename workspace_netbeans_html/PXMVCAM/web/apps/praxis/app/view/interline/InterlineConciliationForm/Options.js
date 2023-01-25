

Ext.define('Ext.Praxis.view.interline.InterlineConciliationForm.Options', {
    //xtype: 'panel',
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
                            tooltip: 'First Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page'

                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin2',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin3',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin4',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin5',
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
                            tooltip: 'Search'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnDisplay',
                            icon: 'resources/img/botones/FalseChart.png',
                            tooltip: 'Display Charts'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnTxt',
//                            icon: 'resources/img/botones/txt.png',
//                            tooltip: 'Export TXT'
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnAdd',
//                            iconCls: 'prx-icon-add',
//                            tooltip: 'New'
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back'
                        }
                    ]
                }
            ]
        }
    ]
});
