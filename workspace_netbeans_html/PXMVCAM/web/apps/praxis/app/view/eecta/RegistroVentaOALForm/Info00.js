
Ext.define('Ext.Praxis.view.eecta.RegistroVentaOALForm.Info00', {
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
                            width: '99%',
                            height: 500,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 35,
                                        align: 'center',
                                        locked: true,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    },
                                    {text: 'Cia', dataIndex: 'A4069CIA', width: 40, align: 'center', locked: true},
                                    {
                                        text: 'Boleto', dataIndex: 'A4069TKTOR', width: 110, align: 'center', locked: true
//                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                                             
//                                            return record.get("A4069FORMA")+record.get("A4069SERIE");
//                                        }
                                    },
                                    { text: 'Trx.', dataIndex: 'A4069TRNCU', align: 'center', width: 50, locked: true},
                                    { text: 'Grupo', dataIndex: 'A4069GRUPO', align: 'center', width: 70, locked: true},
                                    { text: 'Fecha <br> Venta', dataIndex: 'A4069FEVTA', align: 'center', width: 70, locked: true},
                                    { text: 'Agente', dataIndex: 'A4069IATA', align: 'center', width: 70, locked: true},
                                    { text: 'Tipo', dataIndex: 'A4069SERV', align: 'center', width: 70, locked: true},
                                    { text: 'Pax', dataIndex: 'A4069PAX', align: 'left', width: 120, locked: true},
                                    {text: 'Mda.', dataIndex: 'A4069MDLOC', width: 50, align: 'center'},
                                    {text: 'Tarifa', dataIndex: 'A4069FARE', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Iva', dataIndex: 'A4069IVA', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    { text: '%', dataIndex: 'A4069IVAP', align: 'center', width: 40},
                                    {
                                        text: 'TUA', dataIndex: 'A4069TUA', width: 70, align: 'right',
//                                      summaryType: 'sum',
//                                      summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(val_AVG, '0,000.00');
//                                        }
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            if (record.get('IS_TOTAL'))
//                                                metaData.tdStyle = 'font-weight: bold;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }                                        
                                    },
                                    {
                                        text: 'YR', dataIndex: 'A4069YR', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Other', dataIndex: 'A4069OTR', width: 70, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total', dataIndex: 'A4069TOTAL', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    { text: 'Ruta', dataIndex: 'A4069RUTA', align: 'left', width: 120},                                    
                                    { text: 'Carr.', dataIndex: 'A4069CARR', align: 'left', width: 120},
                                    { text: 'Fare base', dataIndex: 'A4069FBAS', align: 'left', width: 120},
                                    { text: 'F. Vuelo', dataIndex: 'A4069FVLO', align: 'center', width: 70}
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
