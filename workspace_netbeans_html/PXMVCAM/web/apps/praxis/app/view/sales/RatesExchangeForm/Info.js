/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.RatesExchangeForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                width: 560,
                height: 500,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '0 0 0 0',
                    id: prototype.id + '-grid_01',
                    width: 710,
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Currency', width: 100, dataIndex: 'A018ISO'},
                            {text: 'Date', width: 100, dataIndex: 'A018DATE'},
                            {text: 'Rate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'USD', width: 150, dataIndex: 'A018URATE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }},
                                    {text: 'GBP', width: 150, dataIndex: 'A018GBP',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }},
                                    {text: 'XEU', width: 150, dataIndex: 'A018XEU',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }}
                                ]
                            }

                        ]
                    }
                },
                {
                    xtype: 'grid',
                    padding: '0 0 0 0',
                    id: prototype.id + '-grid_02',
                    width: 710,
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Currency', width: 100, dataIndex: 'A110ISO'},
                            {text: 'Date', width: 100, dataIndex: 'A110DATE'},
                            {text: 'Rate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'USD', width: 150, dataIndex: 'A110URATE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }},
                                    {text: 'GBP', width: 150, dataIndex: 'A110GBP',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }},
                                    {text: 'XEU', width: 150, dataIndex: 'A110XEU',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }}
                                ]
                            }

                        ]
                    }
                },
                {
                    xtype: 'grid',
                    padding: '0 0 0 0',
                    id: prototype.id + '-grid_03',
                    width: 710,
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Currency From', width: 100, dataIndex: 'A1343CUR'},
                            {text: 'Currency To', width: 100, dataIndex: 'A1343CUR2'},
                            {text: 'Date', width: 100, dataIndex: 'A1343DIS'},
                            {text: 'Rate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: '1 x Currency', width: 175, dataIndex: 'A1343RATE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }},
                                    {text: '1 / Currency', width: 175, dataIndex: 'A13431RATE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :right ; margin-right : 5px ";
                                            return Ext.util.Format.number(value, '0.000000');
                                        }}

                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    padding: '0 0 0 0',
                    id: prototype.id + '-grid_04',
                    width: 630,
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Currency From', width: 100, dataIndex: 'A1526CUR'},
                            {text: 'Currency To', width: 100, dataIndex: 'A1526CUR2'},
                            {text: 'Date', width: 100, dataIndex: 'A1526DIS'},
                            {text: 'Rate', width: 200, dataIndex: 'A1526RATE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 5px ";
                                    return Ext.util.Format.number(value, '0.000000000');
                                }

                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
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
                {
                    xtype: 'grid',
                    padding: '0 0 0 0',
                    id: prototype.id + '-grid_05',
                    width: 630,
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN'},
                            {text: 'Currency From', width: 100, dataIndex: 'A1526CUR'},
                            {text: 'Currency To', width: 100, dataIndex: 'A1526CUR2'},
                            {text: 'Date', width: 100, dataIndex: 'A1526DIS'},
                            {text: 'Rate', width: 270, dataIndex: 'A1526RATE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 5px ";
                                    return Ext.util.Format.number(value, '0.000000000');
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
                        border: true,
                        padding: '0px 5px 0px 0px'
                    },
                    padding: '1px 5px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 600,
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
                                    width: 30
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 30
                                },
                                {
                                    text: 'Of',
                                    width: 30
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 20},
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
}
);

