
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoGrid',
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
            id: prototype.id + '-boxPrincipal',
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
                    border: false,
                    width: prototype.widthContenedor,
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
                            id: prototype.id + '-gridData',
                            columnLines: true,                            
                            width: '100%',
                            height: 490,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [                                    
                                    {text: 'Fecha<br>Proceso', dataIndex: 'A3933FPROC', width: 80, align: 'center', locked: false},                                    
                                    {text: 'Total<br>Archivo', dataIndex: 'A3933TARCH', align: 'right', width: 70, locked: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'Total<br>Cargado', dataIndex: 'A3933TRECI', align: 'right', width: 70, locked: false,
                                         renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }   
                                    },
                                    {text: 'Cpns<br>Caduco', dataIndex: 'QTY_CADUCO', align: 'right', width: 65, locked: false,
                                         renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }   
                                    },
                                    {text: '$ Total<br>Caduco', dataIndex: 'TOT_CADUCO', align: 'right', width: 65, locked: false,
                                         renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }   
                                    },
                                    {text: 'Estado', dataIndex: 'A3933STAT', align: 'left', width: 110, locked: false},                                    
                                    {
                                        xtype: 'actioncolumn',
                                        text:'',
                                        sortable: false,
                                        width: 35,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-log',
                                                tooltip: 'Log proceso CADUCO',
                                                handler: 'onDetailClick03'
                                            }
                                        ]
                                    },
                                    {text: 'Ref. F. Vuelo', dataIndex: 'A3933RANGF', align: 'left', width: 150, locked: false}, 
                                    {text: 'Usuario', dataIndex: 'A3933USRIN', align: 'center', width: 70, locked: false}, 
                                    {text: 'Fecha <br>Carga', dataIndex: 'A3933FECIN', align: 'center', width: 70, locked: false}, 
                                    {text: 'Hora <br>Carga', dataIndex: 'A3933HORIN', align: 'center', width: 70, locked: false}, 
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Det.',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle de boletos',
                                                handler: 'onDetailClick'
                                            }
                                        ]

                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text:'XML',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-104-ticket',
                                                tooltip: 'Ver detalle XML',
                                                handler: 'onDetailClick01'
                                            }
                                        ]

                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Log<br>Err.',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-log',
                                                tooltip: 'Ver detalle errores',
                                                handler: 'onDetailClick02'
                                            }
                                        ]
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
                                    if (rowIndex % 2 === 0)
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
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
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
                                            text: 'Total Records',
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
        }
    ]
});
