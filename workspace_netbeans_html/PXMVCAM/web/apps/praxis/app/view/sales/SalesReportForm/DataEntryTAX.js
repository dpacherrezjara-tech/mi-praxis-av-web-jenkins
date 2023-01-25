/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAX', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-wdataEntryTAX',
    controller: prototype.id + '-dataEntryTAXController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryTAXController'
    ],
    title: 'Taxes',
    header: true,
    width: 450,
    height: 270,
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
            id: prototype.id + '-dataEntryTAX',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 260,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.id + '-det-gridDataTktTAX',
                            height: 250,
                            width: 430,
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
                                    {text: 'Code', width: 50, dataIndex: 'A1532CTAX'},
                                    {text: 'Curr', width: 40, dataIndex: 'A1532MTAX'},
                                    {text: 'Tax Fee<br>Amount', width: 80, dataIndex: 'A1532VTAX',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Airport<br>PFC', width: 60, dataIndex: 'A1532APFC'},
                                    {text: 'Country<br>Code', width: 60, dataIndex: 'A1532PSTAX'},
                                    {text: 'Tax<br>Type', width: 60, dataIndex: 'A1532TIPO'},
                                    {text: 'Tax<br>Ext/Ctrl', width: 60, dataIndex: 'A1532TCTR'}
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});