Ext.define('Ext.Praxis.view.payments.DownloadThePaymentFilesForm.Options', {
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
           width: prototype.widthContenedor,
            border: false,
            items: [
                {
                    xtype: 'Paginator',
                    id: prototype.id + '-pagginator-01',
                    pagInfo: [
                        prototype.id + '-lbl-currentPage',
                        prototype.id + '-lbl-pageCount',
                        prototype.id + '-lbl-total'
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
