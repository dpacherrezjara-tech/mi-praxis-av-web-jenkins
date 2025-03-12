Ext.define('Ext.Praxis.view.gerencial.BiToolsForm.DataEntryShortcut', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryShortcutBiToolsForm',
    requires: [
        'Ext.Praxis.controller.gerencial.BiTools.DataEntryShortcutBiToolsController'
    ],
    controller: 'DataEntryShortcutBiToolsController',
    title: 'Shortcut Help',
    width: 485,
    height: 410,
    x: 0,
    y: 245,
    modal: true,
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'form',
            bodyPadding: 25,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Command',
                            id: prototype.id + '-command',
                            name: 'txtFilter',
                            labelWidth: 80,
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            margin: '0 10 0 10',
                            listeners: {
                                click: 'onDisplayWindow'
                            },
                        },
                        {
                            xtype: 'button',
                            icon: '/TW/images/help.png', // Ruta de la imagen de ayuda
                            tooltip: 'Help'
                        }
                    ]
                }
            ]
        },

        {
            region: 'center',
            xtype: 'grid',
            id: prototype.id + '-cmdGrid',
            title: 'Command list',
            margin: '0 0 0 0',
            width: 420,

            store: {

                fields: ['CM', 'Description', 'Example'],
                data: [
                    {CM: 'DVT', Description: 'Display View Ticket', Example: 'DVT/1344203080502'},
                    {CM: 'DST', Description: 'Display Sales By Ticket', Example: 'DST/1344203080502/CO'},
                    {CM: 'DBR', Description: 'Display Bank Reconciliation', Example: 'DBR/27US6P/1453'},
                    {CM: 'DMN', Description: 'Display Merchant Number', Example: 'DMN/CO890910430'},
                ],
                pageSize: 10,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            },
            columns: [
                {text: 'CM', dataIndex: 'CM', width: 50},
                {text: 'Description', dataIndex: 'Description', flex: 1},
                {text: 'Example', dataIndex: 'Example', flex: 1,
                    listeners: {
                        click: 'setCommandSearch'
                    },
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:left;color:#057ECB";
                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                        return '<a <a href="#gerencial-bi-tools-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: Ext.getCmp(prototype.id + '-cmdGrid') ? Ext.getCmp(prototype.id + '-cmdGrid').getStore() : null
            }
        },
    ],

}
);