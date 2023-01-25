Ext.define('Ext.Praxis.view.interline.IATACalendarForm.Info', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 920,
                            height: 440,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Date',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Invoiced', dataIndex: 'strFormatDate', width: 80
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Period', dataIndex: 'PERIOD', flex: 1//width: 80
                                    },
                                    {
                                        text: 'Information Delivery Settings',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Open',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate1', width: 100
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'strDescripcion', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Close',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate2', width: 100
                                                    },
                                                    {
                                                        text: 'Time', dataIndex: 'strDescripcion1', width: 100
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Sending Parameters Image Support',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate3', width: 110
                                            },
                                            {
                                                text: 'Time', dataIndex: 'strDescripcion2', width: 110
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Status', dataIndex: 'desSTVAL', width: 100
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
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    } 
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: true,
                    width: prototype.widthGrid,
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