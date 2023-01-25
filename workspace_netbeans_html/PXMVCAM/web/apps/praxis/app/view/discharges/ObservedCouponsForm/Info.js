/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.ObservedCouponsForm.Info', {
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
            width: 1470,
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
                    width: 1470,
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
                            //{text: 'Accounting <br>Date', dataIndex: 'FCONT', width: 80},
                            {text: 'Issue <br>Date', dataIndex: 'FVTA', width: 80},
                            {text: 'Air', dataIndex: 'CCIA', width: 60},
                            {text: 'Document', dataIndex: 'FORMASERIE', width: 80},
                            {text: 'Coupon', dataIndex: 'CUPON', width: 80},
                            {text: 'Discharge <br>Type', dataIndex: 'TIPOC', width: 135},
                            {text: 'Final <br>Status', dataIndex: 'USUP', width: 95},
                            {text: 'Source', dataIndex: 'FTE', width: 80},
                            {text: 'IATA', dataIndex: 'AGTIA', width: 80},
                            {text: 'Country', dataIndex: 'PSVVTA', width: 60},
                            {text: 'Document <br>Type', dataIndex: 'CDOC', width: 70},
                            {text: 'From', dataIndex: 'CDEPART', width: 60},
                            {text: 'To', dataIndex: 'CARRIVA', width: 60},
                            {text: 'Carrier', dataIndex: 'CARR', width: 60},
                            {text: 'Flight <br>Date', dataIndex: 'DFLIGHT', width: 80},
                            {text: 'Currency', dataIndex: 'MDACP', width: 65},
                            {text: 'Fare <br>Amount', dataIndex: 'VCPN', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    /*var valor = record.data.Diff;
                                    if (valor < 0) {
                                        metaData.style = 'text-align:right;color:#FF0000;'
                                    } else {
                                        metaData.style = 'text-align:right;color:#000000;'
                                    }*/
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Comm <br>Amount', dataIndex: 'COMISI', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'SComm <br>Amount', dataIndex: 'SCOMISI', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'YQ <br>Amount', dataIndex: 'YQ', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return Ext.util.Format.number(value, '0,000.00');
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
                            width: 1470,
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