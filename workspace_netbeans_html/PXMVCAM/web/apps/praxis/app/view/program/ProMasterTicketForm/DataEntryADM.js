Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryADM', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryADMProMasterTicketForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryADMProMasterTicketController',
        'Ext.Praxis.view.screens.ScrFormUnico'
    ],
    controller: 'DataEntryADMProMasterTicketController',
    title: 'List of ADMs / ACMs',
    header: true,
    height: 400,
    width: 320,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id+'-1-gridDataMemo',
                            height: 487,
                            columnLines: true,
                            plugins: [
                                { 
                                    ptype: 'cellediting',
                                    clicksToEdit: 1
                                }
                            ],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Memo Nbr', dataIndex: 'A2548NMEMO', width: 100, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'A2548NETO', width: 100, align: 'right', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A2548TRNCU', width: 70, align: 'center', editor: { type: 'texfield', editable: false }
                                    },
                                    {
                                        text: 'Edit', xtype: 'actioncolumn', width: 'flex', align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'gridDataMemo_clickHandler'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});