
Ext.define('Ext.Praxis.view.compensation.CompensationForm.InfoGrid', {
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
                                    {text: 'ID File<br>Load', dataIndex: 'A4023IDXLS', width: 80, align: 'center', locked: false},                                    
                                    {text: 'Fecha<br>Proceso', dataIndex: 'A4023FPROC', width: 80, align: 'center', locked: false},                                    
                                    {text: 'Qty<br>Recibido', dataIndex: 'A4023QTYR', align: 'right', width: 75, locked: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'Qty<br>Cargado', dataIndex: 'A4023QTYC', align: 'right', width: 75, locked: false,
                                         renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }   
                                    },                                    
                                    {text: 'Estado', dataIndex: 'A4023STERR', align: 'left', width: 110, locked: false},                                    
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Link<br>Delivery',
                                        sortable: false,
                                        width: 60,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-log',
                                                tooltip: 'Link Delivery EXCEL',
                                                handler: 'onDetailClick03'
                                            }
                                        ]
                                    },
                                    //{text: 'Link<br>Delivery', dataIndex: 'A4023FNAMX', align: 'left', width: 150, locked: false}, 
                                    {text: 'Usuario', dataIndex: 'A4023INGRS', align: 'center', width: 70, locked: false}, 
                                    {text: 'Fecha <br>Carga', dataIndex: 'A4023FECIN', align: 'center', width: 70, locked: false}, 
                                    {text: 'Hora <br>Carga', dataIndex: 'A4023HORIN', align: 'center', width: 70, locked: false}, 
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Detalle',
                                        sortable: false,
                                        width: 55,
                                        align: 'center',
                                        locked: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle',
                                                handler: 'onDetailClick'
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
