Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Options', {
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
            border: false,
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'radiogroup',
                    id: prototype.id + '-viewOption',
                    columns: 3, // Muestra los radios en columna
                    vertical: false,
                    border: false,
                    padding: 5,
                    width:300,
                    items: [
                        {boxLabel: '<span style="color: green; font-weight: bold;">Report</span>', name: 'opcion', inputValue: '1', checked: true},
                        {boxLabel: '<span style="color: green; font-weight: bold;">Week View</span>', name: 'opcion', inputValue: '2'},
                        {boxLabel: '<span style="color: green; font-weight: bold;">Integrator</span>', name: 'opcion', inputValue: '3'}
                    ],
                    listeners: {
                        change: 'onChangeView'
                    }
                },
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
