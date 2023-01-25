/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PaymentNotificationReportForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            //width: 1400,
            width: '100%',
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
                    padding: '1 0 0 0',
                    id: prototype.id + '-gridData',
                    //height: 550,
                    //width: 1400,
                    height: 530,
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
                            {text: 'Nbr', width: 50, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return value;
                                }
                            },
                            {text: 'Batch ID', width: 140, dataIndex: 'A1728LOTE'},
                            {
                                text: 'IATA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'A1728IATA', width: 80},
                                    {text: 'Agency Name', dataIndex: 'strIATA', width: 140,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:left; margin-left:4px;';
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Reference <br> Code', width: 100, dataIndex: 'A1728REFER'},
                            {text: 'Amount Paid', width: 100, dataIndex: 'A2850PAG',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Curr', width: 50, dataIndex: 'A2850MDAPG',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return value;
                                }
                            },
                            {text: 'Capital <br> Amount', width: 80, dataIndex: 'A2850CAP',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return value;
                                }
                            },
                            {
                                text: 'Interest',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Amount', dataIndex: 'A2850IMP', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Tax', dataIndex: 'A2850INT', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:right; margin-right:4px;';
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Payment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', dataIndex: 'A2850FPAG', width: 80},
                                    {text: 'Channel', dataIndex: 'A2850CANAL', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:rleft; margin-left:4px;';
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Bank',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Agency Nbr', dataIndex: 'A2850SUCB', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:rleft; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Cash Nbr', dataIndex: 'A2850NCAJ', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:rleft; margin-left:4px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Type', dataIndex: 'A2850TPAG', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align:rleft; margin-left:4px;';
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Report Type', dataIndex: 'A2850TREP', width: 100,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:rleft; margin-left:4px;';
                                    return value;
                                }
                            },
                            {text: 'Report Date', dataIndex: 'A2850FREP', width: 100},
                            {text: 'Transaction IDe', dataIndex: 'A2850IDTRX', width: 120,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:rleft; margin-left:4px;';
                                    return value;
                                }
                            }
                        ]
                    }
                },
                /** PAGINATION LABELS
                 * */
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
                            //width: 1400,
                            width: '100%',
                            //height: 25,
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
//        ,
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

