Ext.define('Ext.Praxis.view.payments.FiduciaryAlertsForm.Info', {
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
                    height: 580,
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
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
                                    id: prototype.id + '-gridDataMain',
                                    height: 532,
                                    width: 1762,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Day',
                                                width: 80,
                                                dataIndex: 'DAY_NAME',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Date',
                                                width: 80,
                                                dataIndex: 'VALDATE',
                                                align: 'center',
                                                style: 'padding: 6px; background: #6C87A8;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Processor',
                                                menuDisabled: true,
                                                style: 'background: #6C87A8;',
                                                columns: [
                                                    {
                                                        text: 'Amex(AV)',
                                                        width: 100,
                                                        dataIndex: 'AXAV',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amex(TA)',
                                                        width: 100,
                                                        dataIndex: 'AXTA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        width: 100,
                                                        dataIndex: 'DS',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worlday IQ',
                                                        width: 100,
                                                        dataIndex: 'WQ',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worlday Pazien',
                                                        width: 100,
                                                        dataIndex: 'WP',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Daily Actual<br>Collection',
                                                width: 100,
                                                dataIndex: 'RR',
                                                align: 'center',
                                                style: 'padding: 6px; background: #D18F77;',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Last 2 Months',
                                                menuDisabled: true,
                                                style: 'background: #7D9F7D;',
                                                columns: [
                                                    {
                                                        text: 'Amex(AV)',
                                                        width: 100,
                                                        dataIndex: 'PAXAV',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b> ';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amex(TA)',
                                                        width: 100,
                                                        dataIndex: 'PAXTA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b> ';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        width: 100,
                                                        dataIndex: 'PDS',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b> ';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worldpay IQ',
                                                        width: 100,
                                                        dataIndex: 'PWQ',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b> ';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worldpay Pazien',
                                                        width: 100,
                                                        dataIndex: 'PWP',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return '<b>' + value + '</b> ';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Actual vs Average Variation',
                                                menuDisabled: true,
                                                style: 'background: #8A99A6;',
                                                columns: [
                                                    {
                                                        text: 'Amex(AV)',
                                                        width: 100,
                                                        dataIndex: 'PORAXAV',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #8A99A6;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b> %';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amex(TA)',
                                                        width: 100,
                                                        dataIndex: 'PORAXTA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #8A99A6;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b> %';
                                                        }
                                                    },
                                                    {
                                                        text: 'Discover',
                                                        width: 100,
                                                        dataIndex: 'PORDS',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #8A99A6;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b> %';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worldpay IQ',
                                                        width: 100,
                                                        dataIndex: 'PORWQ',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #8A99A6;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b> %';
                                                        }
                                                    },
                                                    {
                                                        text: 'Worldpay Pazien',
                                                        width: 100,
                                                        dataIndex: 'PORWP',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #8A99A6;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b> %';
                                                        }
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
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
                                    height: 519,
                                    width: 1530,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Settlement Information',
                                                menuDisabled: true,
                                                style: 'background: #6C87A8;',
                                                columns: [
                                                    {
                                                        text: 'Processor',
                                                        width: 90,
                                                        dataIndex: 'CODPRO',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Doc Type',
                                                        width: 80,
                                                        dataIndex: 'TDOC',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Sale Date',
                                                        width: 80,
                                                        dataIndex: 'SDATE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Agent',
                                                        width: 70,
                                                        dataIndex: 'SAGENT',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Account Number',
                                                        width: 120,
                                                        dataIndex: 'ACCNUMA',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Currency',
                                                        width: 80,
                                                        dataIndex: 'SCURRENCY',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;'
                                                    },
                                                    {
                                                        text: 'Total',
                                                        width: 120,
                                                        dataIndex: 'TOTAL',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        summaryType: 'sum',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Comision',
                                                        hidden: true,
                                                        width: 110,
                                                        dataIndex: 'COMISION',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Import',
                                                        hidden: true,
                                                        width: 100,
                                                        dataIndex: 'IMPORTE',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Neto',
                                                        hidden: true,
                                                        width: 120,
                                                        dataIndex: 'NETO',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #6C87A8;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales Information',
                                                menuDisabled: true,
                                                style: 'background: #7D9F7D;',
                                                columns: [
                                                    {
                                                        text: 'Sale Date',
                                                        width: 80,
                                                        dataIndex: 'SDATE100',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;'
                                                    },
                                                    {
                                                        text: 'Agent',
                                                        width: 70,
                                                        dataIndex: 'SAGENT100',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;'
                                                    },
                                                    {
                                                        text: 'Currency',
                                                        width: 80,
                                                        dataIndex: 'SCURRENCY100',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;'
                                                    },
                                                    {
                                                        text: 'Match Core',
                                                        width: 110,
                                                        dataIndex: 'SVFOP100W',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Match Other',
                                                        width: 110,
                                                        dataIndex: 'SVFOP100O',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Pending',
                                                        width: 110,
                                                        dataIndex: 'SVFOP100P',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        width: 110,
                                                        dataIndex: 'SVFOP100T',
                                                        align: 'center',
                                                        style: 'padding: 6px; background: #7D9F7D;',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Variation',
                                                width: 120,
                                                dataIndex: 'VARIACION',
                                                align: 'center',
                                                style: 'background: #D18F77;', // Naranja suave
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: '% Variation ',
                                                width: 100,
                                                dataIndex: 'PORCENTAJE_VARIACION',
                                                align: 'center',
                                                style: 'background: #D18F77;', // Naranja suave
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return '<b>' + value + ' %</b>';
                                                }
                                            }
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
                                        {xtype: 'tbspacer', width: 60}, // Aumenté el ancho del espaciador
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
