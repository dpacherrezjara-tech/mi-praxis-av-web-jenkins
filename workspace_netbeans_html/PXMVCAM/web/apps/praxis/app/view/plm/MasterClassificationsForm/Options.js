Ext.define('Ext.Praxis.view.plm.MasterClassificationsForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-options',
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
                            xtype: 'button',
                            id: prototype.id+'-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'imgSearch_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'imgFilter_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'imgExcel_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'imgClear_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnAdd',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New',
                            listeners: {
                                click: 'imgAdd_clickHandler'
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
