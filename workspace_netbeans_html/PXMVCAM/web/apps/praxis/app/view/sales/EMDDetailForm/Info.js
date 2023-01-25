/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.EMDDetailForm.Info', {
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
            width: 1500,
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
//                {
//                    xtype: 'label',
//                    id: prototype.id + '-labelTitle',
//                    labelAlign: 'center',
//                    labelStyle: 'color:#231223',
//                    align: 'center',
//                    margin: '10 0 0 0',
//                    hide:true
//                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 530,
                    //width: 2840,
                    width: 1500,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Processing<br> Date', width: 80, dataIndex: 'FECPROC'},
                            {text: 'Sales<br> Date', width: 80, dataIndex: 'FECVTA'},
                            {text: 'Group', width: 80, dataIndex: 'GRUPO'},
                            {text: 'Doc Type"', width: 100, dataIndex: 'TIPO_DOC'},
                            {text: 'Source', width: 100, dataIndex: 'Source'},
                            {text: 'Transaction', width: 100, dataIndex: 'Transaction'},
                            {text: 'Agent', width: 100, dataIndex: 'Agent'},
                            {text: 'Ticket EMD', width: 100, dataIndex: 'NBR_EMD'},
                            {text: 'Service Code', width: 100, dataIndex: 'COD_SER'},
                            {text: 'Concept Code', width: 100, dataIndex: 'Concept'},
                            {text: 'Currency', width: 100, dataIndex: 'Currency'},
                            {text: 'Amount', width: 100, dataIndex: 'Amount',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'ADC', width: 100, dataIndex: 'ADC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Revenue <br> ADC', width: 100, dataIndex: 'ADC_REV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Amount <br> Revenue', width: 100, dataIndex: 'IMPORTE_REV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Tax', width: 100, dataIndex: 'Tax',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Tax <br> Revenue', width: 100, dataIndex: 'Tax_Revenue',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Ticket', width: 100, dataIndex: 'Aerial_Ticket'},
                            {text: 'PNR', width: 100, dataIndex: 'PNR'},
                            {text: 'ROUTE', width: 100, dataIndex: 'ROUTE'},
                            {text: 'FARE <br>BASIS', width: 100, dataIndex: 'FARE_BASIS'},
                            {text: 'Fare', width: 100, dataIndex: 'Fare',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'IVA', width: 100, dataIndex: 'IVA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Others <br>Taxes', width: 100, dataIndex: 'others_taxes',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Commission', width: 100, dataIndex: 'Commission',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total', width: 100, dataIndex: 'Total',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Accounting<br>Date', width: 100, dataIndex: 'FECCONT'},
                            {text: 'Accounting<br>ID', width: 100, dataIndex: 'ACOUNTID'}


                        ]
                    }
                }
                ,
                /** PAGINATION LABELS*/
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
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1460,
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

