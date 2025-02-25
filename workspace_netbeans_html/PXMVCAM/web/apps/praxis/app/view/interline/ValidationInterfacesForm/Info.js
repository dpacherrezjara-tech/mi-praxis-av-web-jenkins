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
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    height: 650,
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
                                    height: 591,
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
                                                text: 'ID Cont',
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
                                                text: 'Interface',
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
                                                text: 'Bandoc',
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
                                                text: 'Processor',
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
                                                text: 'Reference',
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
                                                text: 'Currency',
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
                                                text: 'Amount Total',
                                                width: 130,
                                                dataIndex: 'VALOR_LIQ',
                                                align: 'center',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_LIQ, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Comision',
                                                width: 120,
                                                dataIndex: 'COMISION',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_COMISION, '0,000.00') + '<b>';
                                                },
                                            },
                                            {
                                                text: 'Rtefue',
                                                width: 120,
                                                dataIndex: 'RTEFUE',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_RTEFUE, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Rteiva',
                                                width: 120,
                                                dataIndex: 'RTEIVA',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_RTEIVA, '0,000.00') + '<b>';
                                                },
                                            },
                                            {
                                                text: 'Rteica',
                                                width: 120,
                                                dataIndex: 'RTEICA',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_RTEICA, '0,000.00') + '<b>';
                                                },
                                            },
                                            {
                                                text: 'Net',
                                                width: 130,
                                                dataIndex: 'NETO',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_NETO, '0,000.00') + '<b>';
                                                },
                                            },
                                            {
                                                text: 'Pay. Currency',
                                                width: 120,
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
                                                text: 'Amount Liq',
                                                width: 100,
                                                dataIndex: 'LIQ_IMPORTE_PAG',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_LIQ_IMPORTE, '0,000.00') + '<b>';
                                                },
                                            },
                                            {
                                                text: 'Amount Tax',
                                                width: 100,
                                                dataIndex: 'TAX_IMPORTE_PAG',
                                                align: 'center',
                                                style: 'padding: 6px;',  // Agregar padding al encabezado de la columna
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_TAX_IMPORTE, '0,000.00') + '<b>';
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetalle',
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
                                    id: prototype.id + '-gridDataDetalle',
                                    height: 562,
                                    width: 1712,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'summary'
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Status', dataIndex: 'strDescStatus', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescStatus + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Process', dataIndex: 'COREP', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcionCOREP + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc. Type', dataIndex: 'descTDOC', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'SAGENT', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Business', dataIndex: 'NEGOC', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80, align: 'center', id: prototype.id + '-ColumnDateDetalle',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Credit Card',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 140, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Author.',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SAUTHOC', width: 70, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank', dataIndex: 'CODEBANK', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 120, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 130, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Bank Information',
                                                columns: [
                                                    {
                                                        text: 'Pay. Date', dataIndex: 'PAYDATE', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Termi', dataIndex: 'TERMI', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Poliza',
                                                columns: [
                                                    {
                                                        text: 'ID', dataIndex: 'BANDOC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Flag ', dataIndex: 'STCON', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Date', dataIndex: 'FCONT', width: 80, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Settl.', dataIndex: 'lngQTYDOC', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridSett'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYDOC, '0,000') + '<b>';
        //                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Qty',
                                                columns: [
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYTKT', width: 50, align: 'center', menuDisabled: true,
                                                        listeners: {
                                                            click: 'onGridTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strCERROR + '"';
                                                            return '<a href="#payments-bank-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetalle').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.lngTotQTYTKT, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Pen.<br>Day', dataIndex: 'PENDINGDAYS', width: 40, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
        //                                                    metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    console.log(data.STVAL, 'data.STVAL')
                                                    if (data.STVAL === '3' && data.PENDINGDAYS >= 4) {
                                                        metaData.style += "background-color:#fcec82;";
                                                    }
                                                    if (['1', '4', '5'].includes(data.STVAL)) {
                                                        metaData.style += "background-color:#ddf0d3;";
                                                        value = ''
                                                    }

                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Regla <br> Conciliacion', dataIndex: 'FREGLA', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'BANDOC', dataIndex: 'BANDOC', width: 140, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'REFER', dataIndex: 'REFER', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Interface', dataIndex: 'USERA4545', width: 150, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Fecha Envio <br> Interface', dataIndex: 'DCONTA4545', width: 120, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    var data = record.data;
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
//                                            {
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                id: prototype.id + '-gridEdit',
//                                                width: 40,
//                                                text: 'View',
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'View',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                       // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            hidden: true,
                            width: 550, // Aumenté el ancho para acomodar el texto más grande
                            height: 35, // Aumenté el alto para que el texto no se vea apretado
                            margin: '10 0 0 0', // Margen superior aumentado
                            defaults: {
                                border: false
                            },
                            items: [
                                {
                                    bodyStyle: 'background: #6C87A8; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);', // Estilo mejorado
                                    xtype: 'panel',
                                    width: '100%',
                                    height: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center',
                                        align: 'middle' // Alineación vertical al centro
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        style: 'color: white; font-weight: bold; margin-top: 7px; font-size: 14px;' // Tamaño de letra aumentado a 14px
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 60 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 60 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            text: 'OF',
                                            width: 50 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        { xtype: 'tbspacer', width: 60 }, // Aumenté el ancho del espaciador
                                        {
                                            text: 'Total Found',
                                            width: 90 // Aumenté el ancho para acomodar el texto más grande
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 60 // Aumenté ligeramente el ancho
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
