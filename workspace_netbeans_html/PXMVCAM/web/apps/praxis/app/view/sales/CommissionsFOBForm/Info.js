/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.CommissionsFOBForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAF9;', /*#E3EAEF*/
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1360,
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
//                    margin: '10 0 0 0'
//                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 510,
                    width: 1360,
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
                            {text: 'Nbr', width: 60, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return value;
                                }
                            },
                            {text: 'Proccess  Date', width: 140, dataIndex: 'A1880FECHA'},
                            {text: 'Operative  Unit', width: 140, dataIndex: 'A1880UNID',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:2px;';
                                    return value;
                                }
                            },
                            {text: 'Type', width: 120, dataIndex: 'A1880INDAP',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:2px;';
                                    return value;
                                }
                            },
                            {text: 'Suplier No', width: 140, dataIndex: 'A1880PROV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:5px;';
                                    return value;
                                }
                            },
                            {text: 'Subsidiary', width: 120, dataIndex: 'A1880SUPR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:2px;';
                                    return value;
                                }
                            },
                            {text: 'Invoice Date', width: 140, dataIndex: 'A1880FFACT'},
                            {text: 'Invoice N°', width: 200, dataIndex: 'A1880NFACT',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:left; margin-right:0px;';
                                    return '<a href="#sales-commissions-fob-form" style="color:#008FE3;">' + value + '</a>';
                                },
                                listeners: {
                                    click: 'onSetGridDataDetail'
                                }
                            },
                            {text: 'Debit', width: 100, dataIndex: 'A1880ACTIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Credit', width: 100, dataIndex: 'A1880PASIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Currency', width: 100, dataIndex: 'A1880MONED'}
                        ]
                    }
                },
                // --------------------------   GRID DATA DETAIL ------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataDetail',
                    height: 450,
                    width: 802,
                    columnLines: true,                    
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 60, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Account', width: 250, dataIndex: 'A1881CUENT'},
                            {text: 'Description', width: 250, dataIndex: 'A1881DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:3px; ';
                                    return value;
                                }
                            },
                            {text: 'Debit', width: 120, dataIndex: 'A1881ACTIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Credit', width: 120, dataIndex: 'A1881PASIV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:3px; ';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
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
                            width: 1360,
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

