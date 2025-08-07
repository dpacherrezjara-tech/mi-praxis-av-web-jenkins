Ext.define('Ext.Praxis.view.payments.TemplateReconciliationForm.Info', {
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
                    xtype: 'container',
                    hidden: true,
                    style: 'background: rgb(227, 234, 249); border: 1px solid #D6E4FF; padding: 10px 0;',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Avianca Group',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            width: 190,
                            labelWidth: 85,
                            disabled: true,
                            id: prototype.id + '-typeClient',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            listConfig: { maxHeight: 130 },
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: '134',
                            margin: '0 10px 0 0', // Espacio entre los combos
                            store: {
                                fields: ['code', 'name'],
                                data: [
                                    { code: '133', name: 'LACSA' },
                                    { code: '134', name: 'AVIANCA' },
                                    { code: '202', name: 'TACA' },
                                    { code: '547', name: 'AEROGAL' }
                                ]
                            },
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "N° Liquidation:",
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            id: prototype.id + '-txtLiquidation',
                            enforceMaxLength: true,
//                            maskRe: /[0-9]/,
                            maxLength: 50,
                            width: 180,
                            labelWidth: 85,
                            disabled: true,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'searchAllGrid'
                            },
                            margin: '0 10 0 0' // Margen a la derecha para separar de la grilla
                        },
                    ]
                },
                {
                    xtype: 'container',
                    style: 'padding: 12px 0;',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataCabecera',
                            height: 140,
                            width: 1712,
                            hidden: false,
                            columnLines: true,
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ], 
                            columns: {
                                items: [
                                    {
                                        xtype: 'checkcolumn', // Columna de checkbox
                                        text: 'Select', // Título de la columna
                                        width: 60, // Ancho de la columna
                                        dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                        align: 'center',
                                        menuDisabled: true,
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        listeners: {
                                            checkchange: 'updateGridHead' // Cambiado de 'change' a 'checkchange'
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Ccust',
                                        width: 90,
                                        menuDisabled: true,
                                        dataIndex: 'CCUST',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Prda',
                                        width: 90,
                                        menuDisabled: true,
                                        dataIndex: 'PRDA',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Codpro',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'CODPRO',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Ccustpro',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'CCUSTPRO',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'FLiquidacion',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'FLIQUIDACI',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Liquidacion',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'LIQUIDACIO',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Merchand',
                                        width: 105,
                                        dataIndex: 'MERCHAND',
                                        menuDisabled: true,
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Bandoc',
                                        menuDisabled: true,
                                        width: 105,
                                        dataIndex: 'BANDOC',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Dateci',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'DATECI',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Tranci',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'TRANCI',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Valdate',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'VALDATE',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Moneda',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'MONEDA',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Total',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'TOTAL',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items[tam-1].data;
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            value = Ext.util.Format.number(data.TOTAL_LIQ, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        }
                                    },
                                    {
                                        text: 'Neto',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'NETO',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items[tam-1].data;
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        }
                                    },
                                    {
                                        text: 'MonedaPago',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'MONEDAPAGO',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'Importe Pag',
                                        width: 105,
                                        menuDisabled: true,
                                        dataIndex: 'IMPORTEPAG',
                                        align: 'center',
                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                        summaryType: 'sum',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataCabecera').getStore().getData().items[tam-1].data;
                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                            value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        }
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: false,
                                    align: 'center'
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            style: 'background: rgb(227, 234, 249); border: 1px solid #D6E4FF; padding: 8px 0;',
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'start'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 50},
                                {
                                   xtype: 'panel',
                                   bodyStyle: 'background: transparent',
                                   xtype: 'datefield',
                                   format: 'Y/m/d',
                                   value: new Date(),
                                   id: prototype.id + '-txtFromSett',
                                   labelStyle: 'text-align: left; font-size: 12px;',
                                   fieldStyle: 'text-align: left; font-size: 12px;',
                                   maskRe: /[0-9/]/,
                                   enforceMaxLength: true,
                                   width: 125,
                                   fieldLabel: 'From',
                                   labelAlign: 'left',
                                   labelWidth: 30,
                                   margin: '0 10px 0 0'
                               },
                               {
                                   xtype: 'panel',
                                   bodyStyle: 'background: transparent',
                                   xtype: 'datefield',
                                   format: 'Y/m/d',
                                   value: new Date(),
                                   id: prototype.id + '-txtToSett',
                                   labelStyle: 'text-align: left; font-size: 12px;',
                                   fieldStyle: 'text-align: left; font-size: 12px;',
                                   maskRe: /[0-9/]/,
                                   enforceMaxLength: true,
                                   width: 110,
                                   fieldLabel: 'To',
                                   labelAlign: 'left',
                                   labelWidth: 15,
                                   margin: '0 10px 0 0',
                                   listeners: {
                                        change: 'searchSettlements'
                                    }
                               },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Merchand:",
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    id: prototype.id + '-txtMerchant',
                                    enforceMaxLength: true,
                                    disabled: false,
                                    maxLength: 15,
                                    width: 180,
                                    labelWidth: 57,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'searchAllGrid'
                                    },
                                    margin: '0 10 0 0' // Margen a la derecha para separar de la grilla
                                },
                               {xtype: 'tbspacer', width: 700},
                               {
                                   xtype: 'panel',
                                   bodyStyle: 'background: transparent',
                                   xtype: 'datefield',
                                   format: 'Y/m/d',
                                   value: new Date(),
                                   id: prototype.id + '-txtFromDisc',
                                   labelStyle: 'text-align: left; font-size: 12px;',
                                   fieldStyle: 'text-align: left; font-size: 12px;',
                                   maskRe: /[0-9/]/,
                                   enforceMaxLength: true,
                                   width: 125,
                                   fieldLabel: 'From',
                                   labelAlign: 'left',
                                   labelWidth: 30,
                                   margin: '0 10px 0 0'
                               },
                               {
                                   xtype: 'panel',
                                   bodyStyle: 'background: transparent',
                                   xtype: 'datefield',
                                   format: 'Y/m/d',
                                   value: new Date(),
                                   id: prototype.id + '-txtToDisc',
                                   labelStyle: 'text-align: left; font-size: 12px;',
                                   fieldStyle: 'text-align: left; font-size: 12px;',
                                   maskRe: /[0-9/]/,
                                   enforceMaxLength: true,
                                   width: 110,
                                   fieldLabel: 'To',
                                   labelAlign: 'left',
                                   labelWidth: 15,
                                   margin: '0 10px 0 0',
                                   listeners: {
                                        change: 'searchDiscounts'
                                    }
                               },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    width: '100%',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 935,
                            height: 400,
                            margin: '10px 5px 0 0',
                            columnLines: true,
                            features: [{
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],  
                            columns: {
                                items: [
                                    {
                                        text: 'Settlements',
                                        menuDisabled: true,
                                        style: 'background: #3D5C4A;',
                                        columns: [
                                            {
                                                xtype: 'checkcolumn', // Columna de checkbox
                                                text: 'Sel', // Título de la columna
                                                width: 45, // Ancho de la columna
                                                menuDisabled: true,
                                                dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                listeners: {
                                                    checkchange: 'updateTotalsOnCheck' // Cambiado de 'change' a 'checkchange'
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Rn', // Título de la columna
                                                width: 45, // Ancho de la columna
                                                menuDisabled: true,
                                                dataIndex: 'RN',
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Amounts A',
                                                menuDisabled: true,
                                                style: 'background: #3D5C4A  ;border-color:white',
                                                columns: [
                                                    {
                                                        text: 'Curr',
                                                        width: 50,
                                                        dataIndex: 'SCURRENCY',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            return '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Total',
                                                        width: 70,
                                                        dataIndex: 'TOTAL',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = "text-align:right;background: #3D5C4A;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_LIQ, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Comision',
                                                        width: 75,
                                                        dataIndex: 'COMISION',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_COMISION, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Comistota',
                                                        width: 78,
                                                        menuDisabled: true,
                                                        dataIndex: 'COMISTOTA',
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_COMISTOTA, '0,000.00');
                                                            return '<b>' + value + '</b>';

                                                        }
                                                    },
                                                    {
                                                        text: 'Neto',
                                                        width: 70,
                                                        dataIndex: 'NETO',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amounts B',
                                                menuDisabled: true,
                                                style: 'background: #3D5C4A  ;border-color:white',
                                                columns: [
                                                    {
                                                        text: 'Curr',
                                                        width: 50,
                                                        dataIndex: 'MONEDAPAGO',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            return '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Im. Pag',
                                                        width: 70,
                                                        dataIndex: 'IMPORTEPAG',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
                                                            metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status',
                                                width: 65,
                                                menuDisabled: true,
                                                dataIndex: 'STVAL',
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value == 3) {
                                                        metaData.style = 'background: #EF5350; color: white;'; // Rojo coral
                                                        return '<span style="font-weight: bold;">Pending</span>';
                                                    } else {
                                                        metaData.style = 'background: #4CAF50; color: white;'; // Verde para "Ok"
                                                        return '<span style="font-weight: bold;">Ok</span>';
                                                    }
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Liquidation <br> Date',
                                                width: 80,
                                                dataIndex: 'ADATE',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Liquidation',
                                                width: 110,
                                                dataIndex: 'LIQUIDACIO',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Merchand',
                                                width: 80,
                                                dataIndex: 'MERCHAND',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Cod',
                                                width: 45,
                                                dataIndex: 'CODPRO',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px;background: #3D5C4A  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3D5C4A  ;color:white";
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: false,
                                    align: 'center'
                                }
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDescuentos',
                            width: 628,
                            height: 400,
                            margin: '10px 0 0 5px',
                            columnLines: true,
                            features: [{
                                dock: 'bottom',
                                ftype: 'summary'
                            }], 
                            columns: {
                                items: [
                                    {
                                        text: 'Discounts',
                                        menuDisabled: true,
                                        style: 'background: #CC5C2B  ;border-color:white',
                                        columns: [
                                            {
                                                xtype: 'checkcolumn',
                                                text: 'Sel',
                                                width: 45,
                                                dataIndex: 'checkActive',
                                                align: 'center',
                                                menuDisabled: true,
                                                style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                listeners: {
                                                    checkchange: 'updateGridDiscount' // Cambiado de 'change' a 'checkchange'
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                },
                                            },
                                            {
                                                text: 'Rn', // Título de la columna
                                                width: 45, // Ancho de la columna
                                                menuDisabled: true,
                                                dataIndex: 'RN',
                                                align: 'center',
                                                style: 'padding:2px;background: #CC5C2B  ;border-color:white',
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.blockChange) {
                                                        metaData.style = 'background:#eeeeee ;'
                                                    }
                                                    return value
                                                },
                                            },
                                            {
                                                text: 'Amounts A',
                                                menuDisabled: true,
                                                style: 'background: #CC5C2B  ;border-color:white',
                                                columns: [
                                                    {
                                                        text: 'Curr',
                                                        width: 50,
                                                        dataIndex: 'MONEDA',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                            return '';
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.blockChange) {
                                                                metaData.style = 'background:#eeeeee ;'
                                                            }
                                                            return value
                                                        },
                                                    },
                                                    {
                                                        text: 'Import',
                                                        width: 60,
                                                        menuDisabled: true,
                                                        dataIndex: 'IMPORTECeba',
                                                        align: 'center',
                                                        style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.blockChange) {
                                                                metaData.style = 'text-align:right;background:#eeeeee ;'
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[0].data;
                                                            metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_IMPORTE, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amounts B',
                                                menuDisabled: true,
                                                style: 'background: #CC5C2B  ;border-color:white',
                                                columns: [
                                                    {
                                                        text: 'Cur',
                                                        width: 50,
                                                        menuDisabled: true,
                                                        dataIndex: 'MONEDAPAGO',
                                                        align: 'center',
                                                        style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.blockChange) {
                                                                metaData.style = 'background:#eeeeee ;'
                                                            }
                                                            return value
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                            return '';
                                                        },
                                                    },
                                                    {
                                                        text: 'Im. Pag',
                                                        width: 60,
                                                        menuDisabled: true,
                                                        dataIndex: 'IMPORTEPAG',
                                                        align: 'center',
                                                        style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.blockChange) {
                                                                metaData.style = 'text-align:right;background:#eeeeee ;'
                                                            } else {
                                                                metaData.style = "text-align:right;";
                                                            }
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[0].data;
                                                            metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                            value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquidation <br> Date',
                                                width: 80,
                                                dataIndex: 'FLIQUIDACI',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.blockChange) {
                                                        metaData.style = 'background:#eeeeee ;'
                                                    }
                                                    return value
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Liquidation',
                                                width: 110,
                                                dataIndex: 'LIQUIDACIO',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.blockChange) {
                                                        metaData.style = 'background:#eeeeee ;'
                                                    }
                                                    return value
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Merchand',
                                                width: 80,
                                                dataIndex: 'MERCHAND',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.blockChange) {
                                                        metaData.style = 'background:#eeeeee ;'
                                                    }
                                                    return value
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                }
                                            },
                                            {
                                                text: 'Cod',
                                                width: 45,
                                                dataIndex: 'CODPRO',
                                                menuDisabled: true,
                                                align: 'center',
                                                style: 'padding:2px; background: #CC5C2B  ;border-color:white',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.blockChange) {
                                                        metaData.style = 'background:#eeeeee ;'
                                                    }
                                                    return value
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #CC5C2B  ;color:white";
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
