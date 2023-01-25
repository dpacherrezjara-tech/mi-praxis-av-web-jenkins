Ext.define('Ext.Praxis.view.gerencial.BusinessToolsForm.DataEntryHelp', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryHelp',
    controller: prototype.id + '-dataEntryHelpController',
    requires: [
        'Ext.Praxis.controller.gerencial.BusinessTools.DataEntryHelpController'
    ],
    title: 'Help Information',
    header: true,
    height: 530,
    width: 650,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formLog',
            defaults: {
                // style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'grid',
                            margin: '20 5 0 5',
                            id: prototype.id + '-gridHelp',
                            // style: 'padding:10px;',
                            height: 400,
                            width: 615,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Field',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Code', width: 100, dataIndex: 'USERFIELD',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Description', width: 250, dataIndex: 'DESCRIPT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'text-align:left;';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Size', width: 50, dataIndex: 'LENGHTF'},
                                    {text: 'Example', width: 200, dataIndex: 'strExample',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left;';
                                            return value;
                                        }
                                    }

                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]
});