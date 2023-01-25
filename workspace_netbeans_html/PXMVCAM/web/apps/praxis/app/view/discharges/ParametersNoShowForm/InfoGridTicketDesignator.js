
Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGridTicketDesignator', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id01 + '-infoGrid',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id01 + '-boxPrincipal',
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
                    id: prototype.id01 + '-boxMainData',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridData',
                            columnLines: true,
                            width: '100%',
                            height: 300,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {text: 'TD', dataIndex: 'A3975KEY2', align: 'left', width: 85},
                                    {text: 'Descripción', dataIndex: 'A3975DESC1', align: 'left', flex: 1},
                                    {
                                        text: 'Activo', dataIndex: 'A3975STATU', width: 50, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Parametro activo" >';
                                            if (value === 'D')
                                                var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="Parametro desactivado" >';
                                            return html;
                                        }
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 == 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
//                        {
//                            xtype: 'Paginator',
//                            id: prototype.id01 + '-pagginator-01',
//                            pagInfo: [
//                                prototype.id01 + '-lbl-currentPage',
//                                prototype.id01 + '-lbl-pageCount',
//                                prototype.id01 + '-lbl-total'
//                            ]
//                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-pie',
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 35,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id01 + '-boxPaginacion',
                                    //width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id01 + '-btn-pag-first',
//                                                    iconCls: 'prx-icon-pagination-first',
//                                                    tooltip: 'First Page',
//                                                    listeners: {
//                                                        click: 'pagFirst'
//                                                    }
//                                                },
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id01 + '-btn-pag-previous',
//                                                    iconCls: 'prx-icon-pagination-previous',
//                                                    tooltip: 'Previous Page',
//                                                    listeners: {
//                                                        click: 'pagPrevious'
//                                                    }
//                                                },
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id01 + '-btn-pag-next',
//                                                    iconCls: 'prx-icon-pagination-next',
//                                                    tooltip: 'Next Page',
//                                                    listeners: {
//                                                        click: 'pagNext'
//                                                    }
//                                                },
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id01 + '-btn-pag-last',
//                                                    iconCls: 'prx-icon-pagination-last',
//                                                    tooltip: 'Last Page',
//                                                    listeners: {
//                                                        click: 'pagLast'
//                                                    }
//                                                },
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id01 + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                },
//                                {
//                                    xtype: 'panel',
//                                    width: '100%',
//                                    //height: 35,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 40
//                                        },
//                                        {
//                                            id: prototype.id01 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 40
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 30
//                                        },
//                                        {
//                                            id: prototype.id01 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 40
//                                        },
//                                        {xtype: 'tbspacer', width: 40},
//                                        {
//                                            text: 'Total',
//                                            width: 60
//                                        },
//                                        {
//                                            id: prototype.id01 + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
