/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFOP', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-wdataEntryFOP',
    controller: prototype.id + '-dataEntryFOPController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFOPController'
    ],
    title: 'Form of Payment',
    header: true,
    width: 700,
    height: 200,
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
            id: prototype.id + '-dataEntryFOP',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 190,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.id + '-det-gridDataTktFOP',
                            height: 180,
                            width: 680,
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
                                    {text: 'Code', width: 50, dataIndex: 'A1531CFOP'},
                                    {text: 'Card<br>Type', width: 40, dataIndex: 'A1531TTARJ'},
                                    {text: 'Ref Number', width: 150, dataIndex: 'A1531NREF'},
                                    {text: 'Curr', width: 40, dataIndex: 'A1531MFOP'},
                                    {text: 'Amount', dataIndex: 'A1531VFOP', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Expired<br>Card Date', width: 80, dataIndex: 'A1531FEXP'},
                                    {text: 'Approval<br>Card', width: 70, dataIndex: 'A1531CAPL'},
                                    {text: 'Curr Net<br>Rem', width: 70, dataIndex: 'A1531MNETR'},
                                    {text: 'Net Rem<br>Amount', width: 80, dataIndex: 'A1531VNETR',
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