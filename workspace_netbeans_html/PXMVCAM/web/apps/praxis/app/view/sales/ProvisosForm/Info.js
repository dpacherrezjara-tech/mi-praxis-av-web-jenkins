Ext.define('Ext.Praxis.view.sales.ProvisosForm.Info', {
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
            id:prototype.id+'-boxMainData',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1176,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridCalendarBSP',
                    width: 1176,
                    height: 510,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'No', width: 70, dataIndex: 'NO', hidden: true,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Airline', width: 60, dataIndex: 'A856LINAER',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Validity', width: 60, dataIndex: 'A856VIGDES',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'C', width: 30, dataIndex: 'A856CLASE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'T', width: 30, dataIndex: 'A856TIPTAR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Sector',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'U', dataIndex: 'A856TRAUNI', width: 30,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'From', dataIndex: 'A856TRADES', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'To', dataIndex: 'A856TRAHAS', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Subtype Rate', width: 100, dataIndex: 'A856SUBTIP',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {
                                text: 'ATBP',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'U', dataIndex: 'A856ATBPUN', width: 30,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'From', dataIndex: 'A856ATBPDE', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'To', dataIndex: 'A856ATBPHA', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Trip Departure', width: 95, dataIndex: 'A856ORIGEN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Proviso %', width: 80, dataIndex: 'A856PORCEN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Prov.Amount', width: 90, dataIndex: 'A856IMPORT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Currency', width: 90, dataIndex: 'A856MONEDA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Codeshare', width: 90, dataIndex: 'A856CODSHA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Subparagraph', width: 100, dataIndex: 'A856SUBPAR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {text: 'Discounts', width: 90, dataIndex: 'A856DESADI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            }
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: 950,
                            height: 25,
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
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});
