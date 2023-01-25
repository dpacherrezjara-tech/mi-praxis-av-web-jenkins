/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountingControlForm.Info', {
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
                width: 1172,
                height: 520,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 500,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 40, dataIndex: 'RN'},
                            {text: 'Airline Code', width: 80, dataIndex: 'CCIA'},
                            {text: 'Valuation Date', width: 100, dataIndex: 'FECVAL'},
                            {text: 'Accounting Date', width: 100, dataIndex: 'FCONT'},
                            {text: 'Currency', width: 70, dataIndex: 'CURRENCY'},
                            {text: 'Module', width: 70, dataIndex: 'MODULO'},
                            {text: 'Qty', width: 70, dataIndex: 'QTY',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' text-align:right; margin-right:3px ';
                                    return  Ext.util.Format.number(value, '0,000');
                                }
                            },
                            {text: 'Fare', width: 90, dataIndex: 'FARE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' text-align:right; margin-right:3px ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'ISC', width: 90, dataIndex: 'ISC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' text-align:right; margin-right:3px ';
                                    return  Ext.util.Format.number(value, '0,000.00.00');
                                }
                            },
                            {text: 'TAX', width: 90, dataIndex: 'TAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' text-align:right; margin-right:3px ';
                                    return  Ext.util.Format.number(value, '0,000.00.00');
                                }
                            },
                            {text: 'Net', width: 90, dataIndex: 'NETO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' text-align:right; margin-right:3px ';
                                    return  Ext.util.Format.number(value, '0,000.00.00');
                                }
                            },
                            {text: 'Audit Date', width: 80, dataIndex: 'DAUDIT'},
                            {text: 'Message', width: 200, dataIndex: 'MENSAJ'}

                        ]
                    }
                }
                ,
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
                        padding: '0px 0px 0px 0px'
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1172,
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
}
);

