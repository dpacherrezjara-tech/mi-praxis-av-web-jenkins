Ext.define('Ext.Praxis.view.plm.MasterClassificationsForm.Info', {
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
                                                    height: 450,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            { 
                                                                text: 'Item', dataIndex: 'RN', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return value;
                                                                }},
                                                            { 
                                                                text: 'Code', dataIndex: 'A3379CLASI', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }},
                                                            { 
                                                                text: 'Description', dataIndex: 'A3379DCLAS', flex: 1,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }},
                                                            {
                                                                xtype: 'actioncolumn',
                                                                text: 'Edit',
                                                                sortable: false,
                                                                width: 50,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-edit',
                                                                        tooltip: 'Edit',
                                                                        bodyStyle: 'vertical-align: center;',
                                                                        handler: 'gridData_act1_clickHandler'
                                                                    }
                                                                ]
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

