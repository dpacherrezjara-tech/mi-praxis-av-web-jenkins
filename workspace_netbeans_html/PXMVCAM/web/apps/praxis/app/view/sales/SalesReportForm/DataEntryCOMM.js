/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMM', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-wdataEntryCOMM',
    controller: prototype.id + '-dataEntryCOMMController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryCOMMController'
    ],
    title: 'Commission',
    header: true,
    width: 350,
    height: 170,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-dataEntryCOMM',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 160,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.id + '-det-gridDataTktCOMM',
                            height: 150,
                            width: 330,
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
                                    {text: 'Type', width: 50, dataIndex: 'A1533TIPO'},
                                    {text: 'Code', width: 80, dataIndex: 'A1533CCOM'},
                                    {text: 'Rate', dataIndex: 'A1533RATE', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Curr', width: 40, dataIndex: 'A1533MCOM'},
                                    {text: 'Amount', dataIndex: 'A1533VCOM', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});