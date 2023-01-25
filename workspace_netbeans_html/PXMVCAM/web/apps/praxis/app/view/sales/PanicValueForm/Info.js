Ext.define('Ext.Praxis.view.sales.PanicValueForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id:prototype.id+'-boxContenGrid',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: prototype.widthGrid,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridPanicValue',
                    width: prototype.widthGrid,
                    height: 510,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr.', width: 40, dataIndex: 'RN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Reg', width: 50, dataIndex: 'A725TREGI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'From', width: 100, dataIndex: 'A725FDESDE',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'To', width: 100, dataIndex: 'A725FHASTA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Fare From', width: 100, dataIndex: 'A725TARIFD',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Fare To', width: 100, dataIndex: 'A725TARIFA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'EQ From', width: 100, dataIndex: 'A725EQPAGD',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'EQ To', width: 100, dataIndex: 'A725EQPAGA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'User', width: 100, dataIndex: 'A725REGIST',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 39,
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthGrid,
                            height: 25,
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
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});
