/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FOBForm.Info', {
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
            //width: 1642,
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
                    //height: 550
                    height: 530,                     
                    border: true,
                    //width: 1632
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
                            {text: 'IATA', width: 70, dataIndex: 'A1728IATA',
                                listeners: {
                                    click: 'onViewDetailClick'
                                },
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "color:#057ECB;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#sales-fob-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                }
                            },
                            {text: 'FOB Name', width: 130, dataIndex: 'A003KEY3',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:4px;';
                                    return value;
                                }
                            },
                            {text: 'Open Date', width: 75, dataIndex: 'A1728FINI'},
                            {text: 'Close Date', width: 75, dataIndex: 'A1728FFIN'},
                            {text: 'Curr.', width: 40, dataIndex: 'A1728MDALC'},
                            {text: 'Fare/<br>Ancillaries', width: 80, dataIndex: 'A1728FARE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Comm.', width: 70, dataIndex: 'A1728TCOM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'IVA', width: 70, dataIndex: 'A1728TIVA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Comm. <br>+ IVA', width: 70, dataIndex: 'A1728TCOMI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total <br> Cash ', width: 80, dataIndex: 'A1728TTCAS',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Total Cash - <br> Comm.', width: 80, dataIndex: 'A1728TCAMC',
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
                                    {text: 'Status', dataIndex: 'A1728STAT', width: 70},
                                    {text: 'Date', dataIndex: 'A1728FENV', width: 70}
                                ]
                            },
                            {text: 'ACK', width: 40, dataIndex: 'ACUSE'},
                            {
                                text: 'Received From FOB',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'App.', dataIndex: 'A1757INDAP', width: 40},
                                    {text: 'Status', dataIndex: 'A1728STRC', width: 50},
                                    {text: 'Date', dataIndex: 'A1728FREC', width: 60},
                                    {text: 'Accounting', dataIndex: 'A1757INDCO', width: 45}
                                ]
                            },
                            {
                                text: 'Payment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'left'
                                },
                                columns: [
                                    {text: 'Reference<br>Code', dataIndex: 'A1728REFER', width: 90},
                                    {text: 'Validity', dataIndex: 'A1728FVIGF', width: 70}
                                ]
                            },
                            {text: 'ID Lote', width: 105, dataIndex: 'A1728LOTE'}
                        ]
                    }
                },
                
                /** PAGINATION LABELS
                 **/
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
                            //width: 1630,
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

