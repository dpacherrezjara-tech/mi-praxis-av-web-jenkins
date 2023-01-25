/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConsortiaForm.Info', {
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
            width: 1542,
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
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    border: true,
                    width: 1542,
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
                            {text: 'IATA', width: 70, dataIndex: 'A2444IATA',
                                listeners: {
                                    click: 'onViewDetailClick'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "color:#057ECB;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#sales-consortia-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                }
                            },
                            {text: 'FOB Name', width: 104, dataIndex: 'A003KEY3',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:4px;';
                                    return value;
                                }
                            },
                            {text: 'Open Date', width: 80, dataIndex: 'A2444FINI'},
                            {text: 'Close Date', width: 80, dataIndex: 'A2444FFIN'},
                            {text: 'Curr.', width: 49, dataIndex: 'A2444MDARV'},
                            {text: 'Fare/Ancillaries', width: 100, dataIndex: 'A2444FARE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Comm.', width: 80, dataIndex: 'A2444TCOM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'IVA', width: 70, dataIndex: 'A2444TIVA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Comm. + IVA', width: 90, dataIndex: 'A2444TCOMI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total Cash ', width: 100, dataIndex: 'A2444TTCAS',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total Cash - <br> Commission', width: 100, dataIndex: 'A2444TCAMC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'Send To FOB',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Status', dataIndex: 'A2444STAT', width: 90},
                                    {text: 'Date', dataIndex: 'A2444FENV', width: 65}
                                ]
                            },
                            {text: 'Acuse', width: 60, dataIndex: 'ACUSE'},
                            {
                                text: 'Received From FOB',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'App.', dataIndex: 'A2447INDAP', width: 60},
                                    {text: 'Status', dataIndex: 'A2444STRC', width: 60},
                                    {text: 'Date', dataIndex: 'A2444FREC', width: 80},
                                    {text: 'Accounting', dataIndex: 'A2447INDCO', width: 90}
                                ]
                            },
                            {text: 'Id Lote', dataIndex: 'A2444LOTE', width: 111}
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
                            width: 1540,
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

