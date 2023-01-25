Ext.define('Ext.Praxis.view.payments.DataRequestedByBankForm.Options', {
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
                            id: prototype.id + '-paggin6',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin7',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin8',
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
            width: 310,
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
                            tooltip: 'Display Charts',
                            listeners: {
                                click: 'btnDisplay_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgExcelH',
                            icon: 'resources/img/icon/16x16/excel2.png',
                            tooltip: 'Historical Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgExcelC',
                            icon: 'resources/img/icon/excel.png',
//                            iconCls: 'prx-icon-excel',
                            tooltip: 'Charge Back Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgMail',
                            icon: 'resources/img/botones/24x24/Forward.png',
                            tooltip: 'Send Mail to Bank',
                            listeners: {
                                click: 'sendMail_clickHandler'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbEmail',
                            fieldStyle: 'text-align:left;',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
//                            emptyText: 'Reception Date',
                            labelWidth: 100,
                            width: 70,
                            anchor: '100%'
                        }
                    ]
                }
            ]
        }
    ]
});
