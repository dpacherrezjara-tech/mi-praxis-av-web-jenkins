prototype.TktBalance = {
    id: 'CtrlTktBalanceForm'
};
Ext.define('Ext.Praxis.view.program.CtrlTktBalanceForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlTktBalanceForm',
    requires: [
        'Ext.Praxis.controller.program.CtrlTktBalanceController'
    ],
    controller: 'CtrlTktBalanceController',
    title: 'OLD/NEW BALANCE',
    header: true,
    width: 1200,
    height: 280,
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
            width: '100%',
            border: false,
            scrollable: true,
            autoScroll: true,
            overflowY: 'scroll',
            padding: '10 13',
            layout: 'vbox',
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    border: true,
                    scrollable: true,
                    autoScroll: true,
                    overflowY: 'scroll',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridDataTktBalance">
                        {
                            xtype: 'grid',
                            id: prototype.TktBalance.id+'-gridDataTktBalance',
                            border: true,
                            height: 110,
                            scrollable: true,
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    { text: 'Document', dataIndex: 'TKT', width: 120 },
                                    { text: 'State', dataIndex: 'A1730FLAG', width: 50 },
                                    { text: 'Cur Ori', dataIndex: 'A1730MDAOR', width: 65 },
                                    {
                                        text: 'Fare', dataIndex: 'A1730VFAR', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX1', width: 50, id: prototype.TktBalance.id+'-Code1' },
                                    { text: 'PFC', dataIndex: 'A1730ATX1', width: 50, id: prototype.TktBalance.id+'-PFC1' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX1', width: 100, id: prototype.TktBalance.id+'-Tax1',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX2', width: 50, id: prototype.TktBalance.id+'-Code2' },
                                    { text: 'PFC', dataIndex: 'A1730ATX2', width: 50, id: prototype.TktBalance.id+'-PFC2' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX2', width: 100, id: prototype.TktBalance.id+'-Tax2',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX3', width: 50, id: prototype.TktBalance.id+'-Code3' },
                                    { text: 'PFC', dataIndex: 'A1730ATX3', width: 50, id: prototype.TktBalance.id+'-PFC3' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX3', width: 100, id: prototype.TktBalance.id+'-Tax3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX4', width: 50, id: prototype.TktBalance.id+'-Code4' },
                                    { text: 'PFC', dataIndex: 'A1730ATX4', width: 50, id: prototype.TktBalance.id+'-PFC4' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX4', width: 100, id: prototype.TktBalance.id+'-Tax4',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX5', width: 50, id: prototype.TktBalance.id+'-Code5' },
                                    { text: 'PFC', dataIndex: 'A1730ATX5', width: 50, id: prototype.TktBalance.id+'-PFC5' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX5', width: 100, id: prototype.TktBalance.id+'-Tax5',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX6', width: 50, id: prototype.TktBalance.id+'-Code6' },
                                    { text: 'PFC', dataIndex: 'A1730ATX6', width: 50, id: prototype.TktBalance.id+'-PFC6' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX6', width: 100, id: prototype.TktBalance.id+'-Tax6',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX7', width: 50, id: prototype.TktBalance.id+'-Code7' },
                                    { text: 'PFC', dataIndex: 'A1730ATX7', width: 50, id: prototype.TktBalance.id+'-PFC7' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX7', width: 100, id: prototype.TktBalance.id+'-Tax7',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX8', width: 50, id: prototype.TktBalance.id+'-Code8' },
                                    { text: 'PFC', dataIndex: 'A1730ATX8', width: 50, id: prototype.TktBalance.id+'-PFC8' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX8', width: 100, id: prototype.TktBalance.id+'-Tax8',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX9', width: 50, id: prototype.TktBalance.id+'-Code9' },
                                    { text: 'PFC', dataIndex: 'A1730ATX9', width: 50, id: prototype.TktBalance.id+'-PFC9' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX9', width: 100, id: prototype.TktBalance.id+'-Tax9',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX10', width: 50, id: prototype.TktBalance.id+'-Code10' },
                                    { text: 'PFC', dataIndex: 'A1730ATX10', width: 50, id: prototype.TktBalance.id+'-PFC10' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX10', width: 100, id: prototype.TktBalance.id+'-Tax10',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX11', width: 50, id: prototype.TktBalance.id+'-Code11' },
                                    { text: 'PFC', dataIndex: 'A1730ATX11', width: 50, id: prototype.TktBalance.id+'-PFC11' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX11', width: 100, id: prototype.TktBalance.id+'-Tax11',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX12', width: 50, id: prototype.TktBalance.id+'-Code12' },
                                    { text: 'PFC', dataIndex: 'A1730ATX12', width: 50, id: prototype.TktBalance.id+'-PFC12' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX12', width: 100, id: prototype.TktBalance.id+'-Tax12',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX13', width: 50, id: prototype.TktBalance.id+'-Code13' },
                                    { text: 'PFC', dataIndex: 'A1730ATX13', width: 50, id: prototype.TktBalance.id+'-PFC13' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX13', width: 100, id: prototype.TktBalance.id+'-Tax13',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX14', width: 50, id: prototype.TktBalance.id+'-Code14' },
                                    { text: 'PFC', dataIndex: 'A1730ATX14', width: 50, id: prototype.TktBalance.id+'-PFC14' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX14', width: 100, id: prototype.TktBalance.id+'-Tax14',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX15', width: 50, id: prototype.TktBalance.id+'-Code15' },
                                    { text: 'PFC', dataIndex: 'A1730ATX15', width: 50, id: prototype.TktBalance.id+'-PFC15' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX15', width: 100, id: prototype.TktBalance.id+'-Tax15',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Code', dataIndex: 'A1730CTX16', width: 50, id: prototype.TktBalance.id+'-Code16' },
                                    { text: 'PFC', dataIndex: 'A1730ATX16', width: 50, id: prototype.TktBalance.id+'-PFC16' },
                                    {
                                        text: 'Amount', dataIndex: 'A1730VTX16', width: 100, id: prototype.TktBalance.id+'-Tax16',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    { text: 'Ind', dataIndex: 'A1730IND', width: 40, id: prototype.TktBalance.id+'-Indicator' },
                                    {
                                        text: 'Comm', dataIndex: 'A1730VCOM', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Over Comm', dataIndex: 'A1730VSCM', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'Tax On Comm', dataIndex: 'A1730VTXC', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {xtype: 'tbspacer', height: 16},
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Form of Payment',
                            style: 'font-weight:bold;',
                            width: 360
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Tax/Fee',
                            style: 'font-weight:bold;',
                            width: 270
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Commission',
                            style: 'font-weight:bold;',
                            width: 235
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Tax On Commission',
                            style: 'font-weight:bold;',
                            width: 235
                        }
                    ]
                },
                {xtype: 'tbspacer', height: 8},
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.TktBalance.id+'-txaFOP',
                            value: '',
                            readOnly: true,
                            fieldStyle: 'font-family:Courier New;background:white;color:#0B333C;font-weight:bold;text-align:left;font-size:12px;',
                            width: 360
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'textarea',
                            id: prototype.TktBalance.id+'-txaTax',
                            value: '',
                            readOnly: true,
                            fieldStyle: 'font-family:Courier New;background:white;color:#0B333C;font-weight:bold;text-align:left;font-size:12px;',
                            width: 270
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'textarea',
                            id: prototype.TktBalance.id+'-txaComm',
                            value: '',
                            readOnly: true,
                            fieldStyle: 'font-family:Courier New;background:white;color:#0B333C;font-weight:bold;text-align:left;font-size:12px;',
                            width: 235
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'textarea',
                            id: prototype.TktBalance.id+'-txaTaxComm',
                            value: '',
                            readOnly: true,
                            fieldStyle: 'font-family:Courier New;background:white;color:#0B333C;font-weight:bold;text-align:left;font-size:12px;',
                            width: 235
                        }
                    ]
                },
                {xtype: 'tbspacer', height: 8},
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    hidden: false,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'textarea',
                            value: '',
                            readOnly: true,
                            fieldStyle: 'font-family:Courier New;background:white;color:#0B333C;font-weight:bold;text-align:left;font-size:12px;',
                            hidden: true,
                            width: 280
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
    ]
});