
Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGridPrestaciones', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id02 + '-infoGrid',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id02 + '-boxPrincipal',
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
                    id: prototype.id02 + '-boxMainData',
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
                            id: prototype.id02 + '-gridData',
                            columnLines: true,
                            width: '100%',
                            height: 200,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {text: 'Pseudo <br>City Code', dataIndex: 'A3975KEY2', align: 'center', width: 90},                                    
                                    {
                                        text: 'Activo', dataIndex: 'A3975STATU', width: 50, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Parametro activo" >';
                                            if (value === 'D')
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
                                                handler: 'onDetailClick01'                                                
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
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-pie',
                            width: '100%',
                            hidden:true,
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
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id02 + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
