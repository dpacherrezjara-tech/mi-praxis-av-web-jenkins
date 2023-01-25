Ext.define('Ext.Praxis.view.sales.MasterBundlesForm.InfoDataEntry', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info2',
    layout: 'border',
    align: 'center',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,
            defaults: {
                border: false,
                width: 1066,
                height: 270,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridAnc',
                    width: 1066,
                    height: 270,
                    hidden: false,
                    columnLines: true,
                    border: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            border: false
                        },
                        items: [
                            {
                                text: 'Ancillaries',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'RFIC', dataIndex: 'A2534ARFIC', width: 80, name: 'A',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'RFIS', dataIndex: 'A2534ARFIS', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'Description', dataIndex: 'A2534DESCA', width: 182,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Total Amount',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Curr.', dataIndex: 'A2534MDABD', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'Total', dataIndex: 'A2534TOTAN', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Tax',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Tax(%)', dataIndex: 'A2534IMPTA', width: 107,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Amount', dataIndex: 'A2534IMPMA', width: 120,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {name: 'title', text: 'Net Amount', width: 110, dataIndex: 'A2534NETOA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {text: 'Fare</br>Per.(%)', width: 90, dataIndex: 'A2534PORCA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'Actions',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 135,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    },
                                    { xtype: 'tbspacer', width: 5 },
                                    {
                                        icon: 'resources/img/botones/16x16/delete.png',
                                        tooltip: 'Remove',
                                        handler: 'onRemoveClick'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
});
