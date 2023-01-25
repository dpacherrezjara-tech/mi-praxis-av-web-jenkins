
Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGrid', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridTree">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: true,                            
                            width: '99%',
                            height: 510,
                            padding: '0px 5px 1px 5px',                                                      
                            columns: {
                                items: [                                      
                                    {text: 'Código', dataIndex: 'A3931CPARM', align: 'left', width: 85},
                                    {text: 'Descripción', dataIndex: 'A3931DESCR', align: 'left', flex: 1},
                                    {text: 'Aplica', dataIndex: 'A3931APLIC', width: 50, align: 'center'},
                                    {text: 'Ord.', dataIndex: 'A3931ORDEN', width: 50, sortable: true, align: 'left'},                                    
                                    {
                                        text: 'Parametros', align: 'center',
                                        columns: [
                                            {
                                              text: '1º Valor', dataIndex: 'A3931PARM1', width: 120,  align: 'left'  
                                            },
                                            {
                                              text: '2º Valor', dataIndex: 'A3931PARM2', width: 120, align: 'left'  
                                            }
                                        ]
                                    },
                                    {text: 'Catálogo', dataIndex: 'A3931ARCHI', width: 70, align: 'left'},
                                    {
                                        text: 'Activo', dataIndex: 'A3931ESTAD', width: 50, align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            //metaData.style = "text-align:center;font-weight:bold;";
                                            //value = '<b>'+value+'</b>';                                            
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Parametro activo" >';
                                            if ( value === 'D' )
                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="Parametro desactivado" >';                                                
                                            return html;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Click for view detail',
                                                handler: 'onEditClick'                                                
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
