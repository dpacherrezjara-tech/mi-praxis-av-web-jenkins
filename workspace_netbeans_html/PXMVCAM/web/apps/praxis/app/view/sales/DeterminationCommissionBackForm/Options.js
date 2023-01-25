

Ext.define('Ext.Praxis.view.sales.DeterminationCommissionBackForm.Options', {
    //xtype: 'panel',
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
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
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnFilter',
//                            iconCls: 'prx-icon-filter',
//                            tooltip: 'Display filter'
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
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
