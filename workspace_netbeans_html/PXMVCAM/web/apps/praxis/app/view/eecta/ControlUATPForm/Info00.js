
Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.Info00', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info00',
    //layout: 'border',
    align: 'left',
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
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
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
                        align: 'left'
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
                            width: 180,
                            height: 500,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {text: 'Fecha<br>Contable', dataIndex: 'A1530FCONT', width: 70, align: 'center'},
                                    {
                                        text: '', dataIndex: 'A1530STS9', align: 'center', width: 30,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                                                                      
                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="PENDIENTE" >';
                                            if ( record.get('A1530STS9') === '1' )
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="PROCESADO" >';
                                            return html;
                                        }
                                    },                                    
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 35,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detalle',
                                                handler: 'onDetalleUATP'
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
                            width: 210,
                            height: 35,                            
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,                            
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPaginacion',
                                    width: 210,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
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
