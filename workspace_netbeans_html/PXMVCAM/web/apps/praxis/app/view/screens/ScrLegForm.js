prototype.Leg = {
    id: 'ScrLegForm'
};
Ext.define('Ext.Praxis.view.screens.ScrLegForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.ScrLegForm',
    requires: [
        'Ext.Praxis.controller.screens.ScrLegController'
    ],
    controller: 'ScrLegController',
    title: 'Leg',
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
                    width: 950,
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
                            height: 170,
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
                                        width: 100,
                                        dataIndex: 'IN_TKT',
                                        text: '<b style="font-size:9px;text-align:center">Tkt</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 45,
                                        dataIndex: 'CUPON',
                                        text: '<b style="font-size:9px">Cp</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaO !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'SUBLEG',
                                        text: '<b style="font-size:9px">Leg</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaD !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'ORIGEN',
                                        text: '<b style="font-size:9px">Frm</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 55,
                                        dataIndex: 'DESTINO',
                                        text: '<b style="font-size:9px">To</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 65,
                                        dataIndex: 'CARRIER',
                                        text: '<b style="font-size:9px">Cr Mk</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'NVLO',
                                        text: '<b style="font-size:9px">Flight MKT</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'FVLO',
                                        text: '<b style="font-size:9px">Date</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'CLASE',
                                        text: '<b style="font-size:9px">Cls</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 70,
                                        dataIndex: 'FBASIS',
                                        text: '<b style="font-size:9px">Fare Basis</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 35,
                                        dataIndex: 'RBD',
                                        text: '<b style="font-size:9px">RBD</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 75,
                                        dataIndex: 'MDAREV',
                                        text: '<b style="font-size:9px">Cur</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 75,
                                        dataIndex: 'CPNVLUN',
                                        text: '<b style="font-size:9px">Amount</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 70,
                                        dataIndex: 'VALCOMMN',
                                        text: '<b style="font-size:9px">Comm</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 70,
                                        dataIndex: 'VALOVRCOMN',
                                        text: '<b style="font-size:9px">Over Comm</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        width: 70,
                                        dataIndex: 'VALYQN',
                                        text: '<b style="font-size:9px">YQ</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important;text-align:right;background:#bcdcf8";
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