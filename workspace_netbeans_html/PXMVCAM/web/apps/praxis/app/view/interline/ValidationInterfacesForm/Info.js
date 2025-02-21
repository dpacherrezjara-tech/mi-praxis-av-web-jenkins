Ext.define('Ext.Praxis.view.interline.ValidationInterfacesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
//                height: 450,
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-vskMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        border: false,
                        height: 150
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            height: 600,
                            width: 1712,
                            hidden: false,
                            columnLines: true,
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'ID CONT',
                                        width: 90,
                                        dataIndex: 'IDCONT',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'INTERFACE',
                                        width: 150,
                                        dataIndex: 'INTERFACE',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'BANDOC',
                                        width: 100,
                                        dataIndex: 'BANDOC',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'PROCESSOR',
                                        width: 100,
                                        dataIndex: 'PROCESADOR',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'REFERENCIA',
                                        width: 130,
                                        dataIndex: 'REFERENCIA',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'MONEDA <br> LIQ',
                                        width: 80,
                                        dataIndex: 'MONEDA_LIQ',
                                        align: 'center',
                                        style: 'padding: 6px;',
                                        summaryType: 'sum',// Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:center';
                                            return '<b>TOTAL</b>';
                                        },
                                    },
                                    {
                                        text: 'VALOR LIQ',
                                        width: 130,
                                        dataIndex: 'VALOR_LIQ',
                                        align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(tam,'tam')
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_LIQ, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'COMISION',
                                        width: 120,
                                        dataIndex: 'COMISION',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_COMISION, '0,000') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'RTEFUE',
                                        width: 120,
                                        dataIndex: 'RTEFUE',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_RTEFUE, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'RTEIVA',
                                        width: 120,
                                        dataIndex: 'RTEIVA',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_RTEIVA, '0,000') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'RTEICA',
                                        width: 120,
                                        dataIndex: 'RTEICA',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_RTEICA, '0,000') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'NETO',
                                        width: 130,
                                        dataIndex: 'NETO',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_NETO, '0,000') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'MONEDA <br> PAGO',
                                        width: 80,
                                        dataIndex: 'MONEDA_PAGO',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 3px;';
                                             metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'LIQ IMPORTE <br> PAG',
                                        width: 110,
                                        dataIndex: 'LIQ_IMPORTE_PAG',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_LIQ_IMPORTE, '0,000') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'TAX IMPORTE <br> PAG',
                                        width: 130,
                                        dataIndex: 'TAX_IMPORTE_PAG',
                                        align: 'center',
                                        style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                            console.log(data,'data')
                                            metaData.style = 'text-align:right';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_TAX_IMPORTE, '0,000') + '<b>';
                                        },
                                    },
                                ]
                            }
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxPag',
                    hidden: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    hidden: true,
                    width: 410,
                    height: 30,
                    margin: '18 0 0 0 ',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            bodyStyle: 'background: #6C87A8; border-radius: 5px;',
                            xtype: 'panel',
                            width: '100%',
                            height: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label'
                            },
                             items: [
                                {
                                    text: 'Page',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    text: 'OF',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    text: 'Total Found',
                                    width: 80,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 40,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
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
