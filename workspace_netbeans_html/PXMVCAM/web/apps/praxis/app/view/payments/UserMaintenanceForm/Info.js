valor = '0';
Ext.define('Ext.Praxis.view.payments.UserMaintenanceForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1250,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1100,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 520,
                                    width: 1100,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items:
                                                [
                                                    {text: 'User', dataIndex: 'A4717USER', width: 200},
                                                   // {text: 'Pass', dataIndex: 'A4717PASS', width: 100},
                                                    {text: 'Processor </br> type', dataIndex: 'A4717TYPEDES', width: 200},
                                                    {text: 'Status', dataIndex: 'A4717ESTAT', width: 60, sortable: false, align: 'right', renderer: 'onRendererColumnStatus'},
                                                    {text: 'User Created',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'User', dataIndex: 'A4717USRIN', width: 80},
                                                            {text: 'date', dataIndex: 'A4717FECIN', width: 80},
                                                            {text: 'Time', dataIndex: 'A4717HORIN', width: 80}
                                                        ]
                                                    },
                                                    {text: 'User Modified',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'User', dataIndex: 'A4717USRAC', width: 80},
                                                            {text: 'date', dataIndex: 'A4717FECAC', width: 80},
                                                            {text: 'Time', dataIndex: 'A4717HORAC', width: 80}
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Detail',
                                                                handler: 'viewDataEntry_clickHandler',
                                                                isActionDisabled: 'OnEditActionDisabled'
                                                            }
                                                        ]
                                                    }
                                                ]
                                    },
                                    listeners: {
                                        afterrender: function (grid) {
                                            // variable de ejemplo: usuario logueado
                                            var username = document.getElementById('menuUser').innerText.trim();
                                            console.log(username);

                                            var col = grid.down('gridcolumn[dataIndex=A4717PSCO]');
                                            if (col && username === 'SAP26T') {
                                                col.setVisible(false); // oculta la columna completa
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: false,
                            width: 1040,
                            margin: '10 0 0 0 ',
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1040,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


