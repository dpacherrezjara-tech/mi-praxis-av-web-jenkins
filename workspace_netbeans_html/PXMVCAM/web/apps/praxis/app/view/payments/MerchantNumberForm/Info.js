Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                 {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1327,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    height: 510,
                                    width: 1327,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            
                                            {text: 'Nbr', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Merchant Code', dataIndex: 'CMERCHAN', width: 145,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Merchant Branch', dataIndex: 'SUCMERCH', width: 128,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Process',style: 'background: #3F5675;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODE', width: 90,style: 'background: #3F5675;border-color:white',},
                                                    {text: 'Name', dataIndex: 'CORE', width: 160, align: 'left',style: 'background: #3F5675;border-color:white', }
                                                ]
                                            },
                                            {text: 'Mode Down Report', dataIndex: 'DREPORT', width: 300,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 1', dataIndex: 'FRANC1', width: 100,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 2', dataIndex: 'FRANC2', width: 100,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 3', dataIndex: 'FRANC3', width: 100,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 4', dataIndex: 'FRANC4', width: 100,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit',
                                                width: 60,
                                                text: 'View',
                                                align: 'center',
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1445,
                            id: prototype.id + '-panelGridDataHistoric',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataHistoric',
                                    height: 510,
                                    width: 1445,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            
                                            {text: 'Nbr', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Merchant Code', dataIndex: 'CMERCHAN', width: 145,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Merchant Branch', dataIndex: 'SUCMERCH', width: 128,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Process',style: 'background: #3F5675;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODE', width: 90,style: 'background: #3F5675;border-color:white',},
                                                    {text: 'Name', dataIndex: 'CORE', width: 140, align: 'left',style: 'background: #3F5675;border-color:white', }
                                                ]
                                            },
                                            {text: 'Mode Down Report', dataIndex: 'DREPORT', width: 240,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 1', dataIndex: 'FRANC1', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 2', dataIndex: 'FRANC2', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 3', dataIndex: 'FRANC3', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Franchise 4', dataIndex: 'FRANC4', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Effective Date',style: 'background: #3F5675;border-color:white',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date Init', dataIndex: 'DEFFEC', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'},
                                                    {text: 'Date End', dataIndex: 'DFINAL', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'},
                                                    {text: 'Secuence', dataIndex: 'SEQ', width: 80, align: 'center',style: 'background: #3F5675;border-color:white'}
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit2',
                                                width: 60,
                                                text: 'View',
                                                align: 'center',
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onViewMirror'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            region: 'south',
            xtype: 'panel',
            id: prototype.id + '-pie',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            height: 30,
            margin: '5 0 18 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #3F5675; border-radius: 5px;',
                    xtype: 'panel',
                    width: '30%',
                    height: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'label'
                    },
                    items: [
                        {
                            text: 'Page',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold'
                        }
                    ]
                }
            ]
        }
    ]
}
);
