Ext.define('Ext.Praxis.view.salesaudit.EMDCodesPricesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;'
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            border: false,
            width: '100%',
            autoScroll: true,
            overflowY: 'scroll',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-vskPrincipal',
                    border: false,
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxConsultas',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-vskDataGrid',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxMainData',
                                            hidden: false,
                                            width: '100%',
                                            bodyStyle: 'background: transparent;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                border: true,
                                                height: '100%'
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id+'-gridData',
                                                    bodyStyle: 'background: transparent;',
                                                    width: '99%',
                                                    height: 510,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            { text: 'SubCode', dataIndex: 'A2665RFIS', width: 70 },
                                                            { text: 'RFIC', dataIndex: 'A2665RFIC', width: 50 },
                                                            { text: 'Type EMD', dataIndex: 'A2665EMDTP', width: 90 },
                                                            {
                                                                text: 'Fee Description', dataIndex: 'A2665DESCR', flex: 1,//width: 140,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Group', dataIndex: 'A2665GROUP', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Domestic',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Price 1', dataIndex: 'A2665DMSTC', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                           return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Price 2', dataIndex: 'A2665RDMST', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatDblNumber(value);

                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: 'A2665MDADO', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            
                                                            {
                                                                text: 'International',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Price 1', dataIndex: 'A2665INTNC', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Price 2', dataIndex: 'A2665RINTN', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return win.formatDblNumber(value);
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: 'A2665MDAIN', width: 70,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'DATE<br>Efective', dataIndex: 'A2665EFECT', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'DATE<br>Discontinuity', dataIndex: 'A2665DESCO', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Applies', dataIndex: 'A2665APLIC', width: 60,sortable: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                xtype: 'actioncolumn',
                                                                text: 'Edit',
                                                                sortable: false,
                                                                width: 35,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-edit',
                                                                        tooltip: 'Edit',
                                                                        handler: 'gridData_act1_clickHandler'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '', dataIndex: '', width: 35,
                                                                listeners: {
                                                                    click: 'gridData_act1_clickHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    var src = data.A2665FLAG==='0' ? 'resources/img/icon/16x16/circle_green.png' : 'resources/img/icon/16x16/circle_red.png';
                                                                    return '<a href="#salesaudit-emd-codes-prices-form"><img src="'+src+'"></a>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxPagDetail',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: '99%',
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: '100%',
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
                                                    id: prototype.id+'-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id+'-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id+'-lblRowsTotal',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                    ]
                }
            ]
        }
    ]
});

