/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.LogBSPJpForm.Info', {
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
            //width: 1200,
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
                    height: 500,
                    //width: 1130,
                    width: '100%',
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
                            {text: 'IATA Code', width: 100, dataIndex: 'A1845AGENT'},
                            {text: 'IATA Name', width: 150, dataIndex: 'IATANAME'},
                            {text: 'Transaction', width: 100, dataIndex: 'A1845TRNCU'},
                            {text: 'Doc. Type', width: 80, dataIndex: 'A1845TDOC'},
                            {text: 'Ticket', width: 100, dataIndex: 'TICKET'},
                            {text: 'CNJ', width: 60, dataIndex: 'A1845FLAG'},
                            {text: 'Issue Date', width: 100, dataIndex: 'A1845FECVT'},
                            {text: 'FareBasis', width: 100, dataIndex: 'A1845FBASI',
                                renderer: function(value, metaData, record) {
                                    var tool = record.data['A1845FBASI'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';

                                    }
                                    return value;
                                }
                            },
                            {text: '% Commision', width: 100, dataIndex: 'A1845PORCO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Fare', width: 80, dataIndex: 'A1845COBL',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Commision', width: 80, dataIndex: 'A1845COMMI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Net Fare', width: 80, dataIndex: 'A1845NETFA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            }
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
                            //width: 1130,
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

