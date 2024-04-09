Ext.define('Ext.Praxis.view.payments.RobotConfigForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1705,
                height: 700,
                margin: '0 0 0 0',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
//                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
//                            padding: '1',
                            border: true,
                            height: 550,
                            width: 920,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    height: 510,
                                    width: 920,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            
                                            {text: 'Nbr', dataIndex: 'RN', width: 40},
                                            {text: 'Code', dataIndex: 'CODES', width: 60,
                                                listeners: {
                                                    click: 'gridDet_clickHandler',
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '<b>';
                                                    return '<a href="#payments-robot-config-form" style="color:#008FE3;text-decoration:underline;">' + value + '</a>';                                                    
                                                }
                                            },
                                            {text: 'Name', dataIndex: 'NAME', width: 250,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Description', dataIndex: 'DECRIPT', width: 450,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'DESC_STVAL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEdit',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                                              
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
//                            padding: '1',
                            border: true,
                            height: 550,
                            width: 920,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    height: 510,
                                    width: 920,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            
                                            {text: 'Nbr', dataIndex: 'RN', width: 40},
                                            {text: 'Code', dataIndex: 'CODES', width: 60,                                                
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'File Name', dataIndex: 'ARCHIVO', width: 250,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Destination', dataIndex: 'DEST', width: 450,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'DESC_STVAL', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                id: prototype.id + '-gridEditDetail',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit Detail',
                                                        handler: 'onEditDetailClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                                              
                            ]
                        }, 
                        {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 700,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 700,
                                            height: 25,
                                            margin: '0 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                                },
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                },
                
            ]
        }
    ]
}
);
