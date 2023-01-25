Ext.define('Ext.Praxis.view.salesaudit.IvaForm.Info', {
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
                            width: '99%',
                            height: 490,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Country', dataIndex: 'COUNTRY', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Country Code', dataIndex: 'CODCNTRY', flex: 1
                                    },
                                    {
                                        text: 'IVA Type', dataIndex: 'TYPEIVA', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'IVA Code', dataIndex: 'CODIVA', flex: 1
                                    },
                                    {
                                        text: 'IVA Percent', dataIndex: 'PORIVA', flex: 1,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Seq', dataIndex: 'SEQ', width: 20,
                                        hidden: true
                                    },
                                    {
                                        text: 'AUDITORIA',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'A2664REGIS', dataIndex: 'A2664REGIS', width: 20,
                                                hidden: true
                                            },
                                            {
                                                text: 'A2664FREGI', dataIndex: 'A2664FREGI', width: 10,
                                                hidden: true
                                            },
                                            {
                                                text: 'A2664HREGI', dataIndex: 'A2664HREGI', width: 10,
                                                hidden: true
                                            },
                                            {
                                                text: 'A2664REVIS', dataIndex: 'A2664REVIS', width: 10,
                                                hidden: true
                                            },
                                            {
                                                text: 'A2664FREVI', dataIndex: 'A2664FREVI', width: 10,
                                                hidden: true
                                            },
                                            {
                                                text: 'A2664HREVI', dataIndex: 'A2664HREVI', width: 10,
                                                hidden: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text: 'Edit',
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
                        // </editor-fold>
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