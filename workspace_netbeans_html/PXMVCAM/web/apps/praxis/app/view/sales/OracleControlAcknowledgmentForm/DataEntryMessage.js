prototype.Leg = {
    id: 'DataEntryMessage'
};
Ext.define('Ext.Praxis.view.sales.OracleControlAcknowledgmentForm.DataEntryMessage', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMessage',
    requires: [
        'Ext.Praxis.controller.sales.OracleControlAcknowledgment.DataEntryMessageController'
    ],
    controller: 'DataEntryMessageController',
    title: 'Oracle Control Acknowledgement - Web Service SOA Messages Table',
    header: true,
    width: 1000,
    height: 300,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.Leg.id+'-boxCpnInfo',
                    hidden: false,
                    width: 1000,
                    height: 280,
                    layout: 'fit',
                    autoScroll: true,
                    bodyStyle: 'background:#E8F9E8',
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="gridLeg">
                        {
                            xtype: 'grid',
                            id: prototype.Leg.id+'-gridLeg',
                            margin: '5 0',
                            bodyStyle: 'background:#E6EFF5',
                            height: 470,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                items: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 40,
                                        dataIndex: 'RN',
                                        text: '<b style="font-size:9px;text-align:center">Nbr</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 820,
                                        dataIndex: 'A2160C12',
                                        text: '<b style="font-size:9px">Message</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";                                            
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'A2160C1',
                                        text: '<b style="font-size:9px">General ID</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";                                            
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 100,
                                        dataIndex: 'A2160C2',
                                        text: '<b style="font-size:9px">General Status</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'A2160C3',
                                        text: '<b style="font-size:9px">Internal ID</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 150,
                                        dataIndex: 'A2160C4',
                                        text: '<b style="font-size:9px">Internal Process Type</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 150,
                                        dataIndex: 'A2160C5',
                                        text: '<b style="font-size:9px">Internal Status</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 100,
                                        dataIndex: 'A2160C6',
                                        text: '<b style="font-size:9px">GRP Module</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 100,
                                        dataIndex: 'A2160C7',
                                        text: '<b style="font-size:9px">ID File/Module</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 250,
                                        dataIndex: 'A2160C8',
                                        text: '<b style="font-size:9px">Filename</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 100,
                                        dataIndex: 'A2160C9',
                                        text: '<b style="font-size:9px">Record ID</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 50,
                                        dataIndex: 'A2160C10',
                                        text: '<b style="font-size:9px">Lines</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 200,
                                        dataIndex: 'A2160C11',
                                        text: '<b style="font-size:9px">Record Status</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                }               
            ]
        }
    ]
});