/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountedAmountsInvoicedForm.Info', {
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
                width: 1890,
                height: 530,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
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
                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                            {text: 'Cia', width: 80, dataIndex: 'A2559CIA'},
                            {text: 'Form', width: 80, dataIndex: 'A2559FORMA'},
                            {text: 'Serial', width: 80, dataIndex: 'A2559SERIE'},
                            {text: 'Coupon', width: 80, dataIndex: 'A2559CUPON'},
                            {text: 'Valuation Date', width: 120, dataIndex: 'A2559FFILE'},
                            {text: 'Flight Date', width: 120, dataIndex: 'A2559FPRO'},
                            {text: 'Clearing Date', width: 120, dataIndex: 'A2559FCLEA'},
                            {text: 'Period', width: 80, dataIndex: 'A2559PERID'},
                            {text: 'Airline Code', width: 120, dataIndex: 'A2559FACT'},
                            {text: 'Accounting Date', width: 120, dataIndex: 'A2559FCONT'},
                            {text: 'Invoice Number', width: 120, dataIndex: 'A2559FACTU'},
                            {text: 'Accounted',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Fare', width: 80, dataIndex: 'A2559PFARE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'TAX', width: 80, dataIndex: 'A2559PTAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'ISC', width: 80, dataIndex: 'A2559PISC',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'Invoiced',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Fare', width: 80, dataIndex: 'A2559FFARE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'TAX', width: 80, dataIndex: 'A2559FTAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'ISC', width: 80, dataIndex: 'A2559FISC',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            },
                            {text: 'Differences',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Fare', width: 80, dataIndex: 'A2559DFARE',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'TAX', width: 80, dataIndex: 'A2559DTAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'ISC', width: 80, dataIndex: 'A2559DISC',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' text-align:right; margin-right:3px ';
                                            return  Ext.util.Format.number(value, '0,000');
                                        }
                                    }
                                ]
                            }
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
                            width: 1890,
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

