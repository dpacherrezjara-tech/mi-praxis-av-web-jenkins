/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.idBalance = 'DataEntryBalance';

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryBalance', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idBalance + '-wdataEntryBalance',
    controller: prototype.idBalance + '-dataEntryBalanceController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryBalanceController'
    ],
    title: 'OLD / NEW Balance',
    header: true,
    width: 1200,
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
            id: prototype.idBalance + '-dataEntryBalance',
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
                            id: prototype.idBalance + '-det-gridDataTktBalance',
                            height: 150,
                            width: 1160,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    resizable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Document', width: 120, dataIndex: 'TKT'},
                                    {text: 'State', width: 50, dataIndex: 'A1730FLAG'},
                                    {text: 'Curr<br>Ori', width: 40, dataIndex: 'A1730MDAOR'},
                                    {text: 'Fare', dataIndex: 'A1730VFAR', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code1', width: 40, dataIndex: 'A1730CTX1',hidden:true},
                                    {text: 'PFC', id:'PFC1', width: 40, dataIndex: 'A1730ATX1',hidden:true},
                                    {text: 'Amount', id:'Tax1', width: 80, dataIndex: 'A1730VTX1',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code2', width: 40, dataIndex: 'A1730CTX2',hidden:true},
                                    {text: 'PFC', id:'PFC2', width: 40, dataIndex: 'A1730ATX2',hidden:true},
                                    {text: 'Amount', id:'Tax2', width: 80, dataIndex: 'A1730VTX2',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code3', width: 40, dataIndex: 'A1730CTX3',hidden:true},
                                    {text: 'PFC', id:'PFC3', width: 40, dataIndex: 'A1730ATX3',hidden:true},
                                    {text: 'Amount', id:'Tax3', width: 80, dataIndex: 'A1730VTX3',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code4', width: 40, dataIndex: 'A1730CTX4',hidden:true},
                                    {text: 'PFC', id:'PFC4', width: 40, dataIndex: 'A1730ATX4',hidden:true},
                                    {text: 'Amount', id:'Tax4', width: 80, dataIndex: 'A1730VTX4',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code5', width: 40, dataIndex: 'A1730CTX5',hidden:true},
                                    {text: 'PFC', id:'PFC5', width: 40, dataIndex: 'A1730ATX5',hidden:true},
                                    {text: 'Amount', id:'Tax5', width: 80, dataIndex: 'A1730VTX5',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code6', width: 40, dataIndex: 'A1730CTX6',hidden:true},
                                    {text: 'PFC', id:'PFC6', width: 40, dataIndex: 'A1730ATX6',hidden:true},
                                    {text: 'Amount', id:'Tax6', width: 80, dataIndex: 'A1730VTX6',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code7', width: 40, dataIndex: 'A1730CTX7',hidden:true},
                                    {text: 'PFC', id:'PFC7', width: 40, dataIndex: 'A1730ATX7',hidden:true},
                                    {text: 'Amount', id:'Tax7', width: 80, dataIndex: 'A1730VTX7',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code8', width: 40, dataIndex: 'A1730CTX8',hidden:true},
                                    {text: 'PFC', id:'PFC8', width: 40, dataIndex: 'A1730ATX8',hidden:true},
                                    {text: 'Amount', id:'Tax8', width: 80, dataIndex: 'A1730VTX8',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code9', width: 40, dataIndex: 'A1730CTX9',hidden:true},
                                    {text: 'PFC', id:'PFC9', width: 40, dataIndex: 'A1730ATX9',hidden:true},
                                    {text: 'Amount', id:'Tax9', width: 80, dataIndex: 'A1730VTX9',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code10', width: 40, dataIndex: 'A1730CTX10',hidden:true},
                                    {text: 'PFC', id:'PFC10', width: 40, dataIndex: 'A1730ATX10',hidden:true},
                                    {text: 'Amount', id:'Tax10', width: 80, dataIndex: 'A1730VTX10',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code11', width: 40, dataIndex: 'A1730CTX11',hidden:true},
                                    {text: 'PFC', id:'PFC11', width: 40, dataIndex: 'A1730ATX11',hidden:true},
                                    {text: 'Amount', id:'Tax11', width: 80, dataIndex: 'A1730VTX11',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code12', width: 40, dataIndex: 'A1730CTX12',hidden:true},
                                    {text: 'PFC', id:'PFC12', width: 40, dataIndex: 'A1730ATX12',hidden:true},
                                    {text: 'Amount', id:'Tax12', width: 80, dataIndex: 'A1730VTX12',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code13', width: 40, dataIndex: 'A1730CTX13',hidden:true},
                                    {text: 'PFC', id:'PFC13', width: 40, dataIndex: 'A1730ATX13',hidden:true},
                                    {text: 'Amount', id:'Tax13', width: 80, dataIndex: 'A1730VTX13',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code14', width: 40, dataIndex: 'A1730CTX14',hidden:true},
                                    {text: 'PFC', id:'PFC14', width: 40, dataIndex: 'A1730ATX14',hidden:true},
                                    {text: 'Amount', id:'Tax14', width: 80, dataIndex: 'A1730VTX14',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code15', width: 40, dataIndex: 'A1730CTX15',hidden:true},
                                    {text: 'PFC', id:'PFC15', width: 40, dataIndex: 'A1730ATX15',hidden:true},
                                    {text: 'Amount', id:'Tax15', width: 80, dataIndex: 'A1730VTX15',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code16', width: 40, dataIndex: 'A1730CTX16',hidden:true},
                                    {text: 'PFC', id:'PFC16', width: 40, dataIndex: 'A1730ATX16',hidden:true},
                                    {text: 'Amount', id:'Tax16', width: 80, dataIndex: 'A1730VTX16',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code17', width: 40, dataIndex: 'A1730CTX17',hidden:true},
                                    {text: 'PFC', id:'PFC17', width: 40, dataIndex: 'A1730ATX17',hidden:true},
                                    {text: 'Amount', id:'Tax17', width: 80, dataIndex: 'A1730VTX17',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code18', width: 40, dataIndex: 'A1730CTX18',hidden:true},
                                    {text: 'PFC', id:'PFC18', width: 40, dataIndex: 'A1730ATX18',hidden:true},
                                    {text: 'Amount', id:'Tax18', width: 80, dataIndex: 'A1730VTX18',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code19', width: 40, dataIndex: 'A1730CTX19',hidden:true},
                                    {text: 'PFC', id:'PFC19', width: 40, dataIndex: 'A1730ATX19',hidden:true},
                                    {text: 'Amount', id:'Tax19', width: 80, dataIndex: 'A1730VTX19',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cod', id:'Code20', width: 40, dataIndex: 'A1730CTX20',hidden:true},
                                    {text: 'PFC', id:'PFC20', width: 40, dataIndex: 'A1730ATX20',hidden:true},
                                    {text: 'Amount', id:'Tax20', width: 80, dataIndex: 'A1730VTX20',hidden:true,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Ind', id:'Indicator', width: 40, dataIndex: 'A1730IND',hidden:true},
                                    {text: 'FCambio', width: 70, dataIndex: 'A1730FCAMB'},
                                    {text: 'Rate Rev', width: 80, dataIndex: 'A1730TCAMB',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Rate Loc<br>Balance', width: 80, dataIndex: 'A1730TCAMX',
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