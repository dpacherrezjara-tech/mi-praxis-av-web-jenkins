Ext.define('Ext.Praxis.view.salesaudit.ADMReasonsForm.Info', {
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
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    width: '100%',
                    hidden: false,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: '99%',
                            height: 510,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Cust', dataIndex: 'A2560CCUST', width: 50, sortable: false
                                    },
                                    {
                                        text: 'Cod.Razon', dataIndex: 'A2560CODRZ', width: 77
                                    },
                                    {
                                        text: 'Family', dataIndex: 'A2560FAMIL', flex: 1,//width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Comment',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Relation', dataIndex: 'A2560COMRE', width: 175,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Description', dataIndex: 'A2560COMES', width: 185,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Des.English', dataIndex: 'A2560COMEN', width: 175,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Des.Portuguese', dataIndex: 'A2560COMPO', width: 175,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Des.French', dataIndex: 'A2560COMFR', width: 175,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + value + '"';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'REGIS', dataIndex: 'A2560REGIS', width: 10,
                                        hidden: true
                                    },
                                    {
                                        text: 'A2560FREGI', dataIndex: 'A2560FREGI', width: 10,
                                        hidden: true
                                    },
                                    {
                                        text: 'A2560HREGI', dataIndex: 'A2560HREGI', width: 10,
                                        hidden: true
                                    },
                                    {
                                        text: 'A2560REVIS', dataIndex: 'A2560REVIS', width: 10,
                                        hidden: true
                                    },
                                    {
                                        text: 'A2560FREVI', dataIndex: 'A2560FREVI', width: 10,
                                        hidden: true
                                    },
                                    {
                                        text: 'A2560HREVI', dataIndex: 'A2560HREVI', width: 10,
                                        hidden: true
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'Edit',
                                        width: 40,
                                        sortable: false,
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
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: prototype.widthContenedor,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
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
                // </editor-fold>
            ]
        }
    ]
});