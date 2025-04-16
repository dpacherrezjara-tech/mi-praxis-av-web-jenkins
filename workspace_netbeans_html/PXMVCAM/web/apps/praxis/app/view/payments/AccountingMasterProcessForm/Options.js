Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Options', {
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
                                click: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnProcess',
                            iconCls: 'prx-icon-image-process',
                            tooltip: 'Process',
                            listeners: {
                                click: 'onProcessClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnProcessProvis',
                            iconCls: 'prx-icon-reload',
                            tooltip: 'Provision',
                            listeners: {
                                click: 'onClickLoadProvision'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSap',
                            iconCls: 'prx-icon-image-file',
                            tooltip: 'Update SAP',
                            listeners: {
                                click: 'onSapClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'onDisplayFilterBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClearOptionsBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
