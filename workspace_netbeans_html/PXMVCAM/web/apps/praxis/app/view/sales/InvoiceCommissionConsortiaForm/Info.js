

Ext.define('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            //padding: '20 0 0 0',
                            padding: '1 1 1 1',
                            id: prototype.id + '-gridData',
                            height: 530,
                            border: true,
                            //width: 1262,
                            width: '100%',
                            columnLines: true,
                            resizable: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'IATA', width: 70, dataIndex: 'A2447IATA'},
                                    {text: 'IATA Name', width: 180, dataIndex: 'A003KEY3'},
                                    {text: 'Invoice <br> Number', width: 150, dataIndex: 'A2447NFACT'},
                                    {text: 'Invoice <br> Date', width: 90, dataIndex: 'A2447FFACT',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Currency', width: 70, dataIndex: 'A2447MONED',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:center; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Commission', width: 100, dataIndex: 'A2447COMM',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'IVA', width: 70, dataIndex: 'A2447IVA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Commission + IVA', width: 120, dataIndex: 'A2447COMIV',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total Cash', width: 100, dataIndex: 'A2447TCASH',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total Cash - Commission', width: 160, dataIndex: 'A2447CAMCO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'App.', width: 50, dataIndex: 'A2447INDAP',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Acc.', width: 50, dataIndex: 'A2447INDCO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        text: 'Edit',
                                        width: 50,
                                        align: 'center',
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
                        },
                        /** PAGINATION LABELS*/
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            //height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true,
                                padding: '0px 1px 0px 1px'
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    // height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
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

                }
            ]
        }
//        {
//            region: 'south',
//            layout: 'border',
//            height: 0,
//            defaults: {
//                style: 'margin: 2px;',
//                bodyStyle: 'background: transparent;',
//                border: false
//            },
//            items: [
//            ]
//        }
    ]
}
);

