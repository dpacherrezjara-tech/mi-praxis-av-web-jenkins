Ext.define('Ext.Praxis.view.payments.ExtBankReconciliationForm.Options', {
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
                            xtype: 'radiogroup',
                            id: prototype.id + '-viewOption',
                            columns: 2, // Puedes ajustar el número de columnas según tus necesidades
                            vertical: false, // Esto alinea los botones verticalmente,
                            defaults: {
                                margin: '0 5 0 5' // Margen entre los botones
                            },
                            items: [
                                {boxLabel: '<b style="color:#148D28;">By Bank</b>', name: 'opcion', inputValue: 'B', checked: true, width: 80},
                                {boxLabel: '<b style="color:#148D28;">By Settlement</b>', name: 'opcion', inputValue: 'S', width: 110}
                            ],
                            listeners: {
                                change: 'onChangeModule'
                            }
                        }
                    ]
                }
            ]
        },
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
                            tooltip: 'Pending Deposits and Settlements',
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
