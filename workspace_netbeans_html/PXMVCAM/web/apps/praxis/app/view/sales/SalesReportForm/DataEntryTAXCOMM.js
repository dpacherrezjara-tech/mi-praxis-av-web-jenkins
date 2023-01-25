/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMM', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-wdataEntryTAXCOMM',
    controller: prototype.id + '-dataEntryTAXCOMMController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTAXCOMMController'
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
            id: prototype.id + '-dataEntryTAXCOMM',
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
                            id: prototype.id + '-det-gridDataTktTAXCOMM',
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
                                    {text: 'Code', width: 80, dataIndex: 'A1534CTCOM'},
                                    {text: 'Type', width: 50, dataIndex: 'A1534TIPO'},
                                    {text: 'Rate', dataIndex: 'A1534RATE', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Curr', width: 40, dataIndex: 'A1534MTXC'},
                                    {text: 'Amount', dataIndex: 'A1534VTXC', width: 80,
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