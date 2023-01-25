

Ext.define('Ext.Praxis.view.flown.AccountingCalendarForm.Options', {
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
            border: true,
            height: 25,
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
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        }
                    ]
                }
            ]
        }
    ]
});
