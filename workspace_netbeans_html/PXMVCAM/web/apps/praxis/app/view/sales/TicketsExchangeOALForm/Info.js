/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.TicketsExchangeOALForm.Info', {
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
                            {text: 'Accounting <br> Date', dataIndex: 'A1964FCONT', width: 80},
                            {text: 'Invoice <br> Period', dataIndex: 'A1964INVOICE', width: 80},
                            {text: 'Procesing <br> Date', dataIndex: 'A1530FPROC', width: 80},
                            {text: 'Source', dataIndex: 'A720ORIG', width: 80},
                            {text: 'IATA', dataIndex: 'A720AGENTE', width: 80},
                            {text: 'NEW TICKET',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Air', dataIndex: 'A720CIAI', width: 60},
                                    {text: 'Document', dataIndex: 'A720DOCUMENT', width: 80},
                                    {text: 'Issue <br>Date', dataIndex: 'A720FECVTA', width: 80}
                                ]
                            },
                            {text: 'OLD TICKET',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Air', dataIndex: 'A730CIA', width: 60},
                                    {text: 'Document', dataIndex: 'A730DOCUMENT', width: 80},
                                    {text: 'Issue <br>Date', dataIndex: 'A730FECVTA', width: 80},
                                    {text: 'ETKT', dataIndex: 'A720ETKT', width: 70},
                                    {text: 'CNJ', dataIndex: 'A730FLAG', width: 60},
                                    {text: 'Coupon', dataIndex: 'A730CUPON', width: 60},
                                    {text: 'Curr', dataIndex: 'A730MONREG', width: 60},
                                    {text: 'Fare', dataIndex: 'VALUE', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'INVOICE',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', dataIndex: 'DES_A050FCONTA', width: 80},
                                    {text: 'Nbr', dataIndex: 'DES_A050CRTR', width: 80},
                                    {text: 'Fare', dataIndex: 'A050ACEPTA', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'Diference <br>Fare', dataIndex: 'Diff', width: 80,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var valor = record.data.Diff;
                                    if (valor < 0) {
                                        metaData.style = 'text-align:right;color:#FF0000;'
                                    } else {
                                        metaData.style = 'text-align:right;color:#000000;'
                                    }
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

