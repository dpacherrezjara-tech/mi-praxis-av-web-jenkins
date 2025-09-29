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
            hidden: false,
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
        },
        {
            region: 'center',
            id: prototype.id + '-boxConsultas2',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            hidden: true,
            border: false,
            autoScroll: true,
            items: [

                // --- Caja BANDOC ---
                {
                    xtype: 'panel',
                    width: 660,
                    border: false,
                    margin: '8 0 8 8',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    bodyPadding: 5,
                    bodyStyle: 'background-color: #F4F7FD;',
//                    style: 'border:2px solid #B8A189; border-radius:6px; background:#FAF9F7;',
                    items: [
                        // Filtros Bandoc
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            style: 'background:#EFE6DC; border:1px solid #D6C4A0; padding:8px; border-radius:4px;',
                            width: 650,
                            defaults: {
                                margin: '0 10 0 0',
                                labelAlign: 'left',
                                labelStyle: 'font-size:12px; font-weight:bold;',
                                fieldStyle: 'font-size:12px; text-align:center;'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Valdate From',
                                    id: prototype.id + '-txtFromBandoc',
                                    format: 'Y/m/d',
                                    value: new Date(),
                                    width: 190,
                                    labelWidth: 85
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Valdate To',
                                    id: prototype.id + '-txtToBandoc',
                                    format: 'Y/m/d',
                                    hidden: true,
                                    value: new Date(),
                                    width: 180,
                                    labelWidth: 70
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bandoc',
                                    id: prototype.id + '-txtBandocSale',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 10,
                                    width: 150,
                                    labelWidth: 50,
                                    enableKeyEvents: true,
                                    listeners: { keypress: 'searchBandocSales' }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkMarkBandocs',
                                    fieldLabel: 'Mark All', 
                                    labelWidth: 60,   
                                    boxLabel: '',  
                                    checked: false,
                                    labelStyle: 'font-weight:bold;',
                                    listeners: { change: 'markAllGridBandoc' }
                                },
                            ]
                        },
                        // Grid Bandoc
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData212',
                            height: 460,
                            width: 650,
                            hidden: false,
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
                                        text: 'DETAILS', 
                                        style: 'background: #8A7155;border-color:white',
                                        columns: [
                                                {
                                        xtype: 'checkcolumn', // Columna de checkbox
                                        text: 'SEL', // Título de la columna
                                        width: 50, // Ancho de la columna
                                        dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                        align: 'center',
                                        style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                        menuDisabled: true,
                                        listeners: {
                                            checkchange: 'updateGridBandocSale' 
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #8A7155;color:white";
                                            return '';
                                        }
                                    },
                                                {
                                                    text: 'RN',
                                                    width: 45,
                                                    dataIndex: 'RN',
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'BANDOC',
                                                    width: 88,
                                                    dataIndex: 'BANDOC',
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'VALDATE',
                                                    width: 75,
                                                    dataIndex: 'VALDATE',
                                                    menuDisabled: true,
                                                    align: 'center',
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'DATE',
                                                    width: 75,
                                                    menuDisabled: true,
                                                    dataIndex: 'ADATE',
                                                    align: 'center',
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'ACCOUNT',
                                                    menuDisabled: true,
                                                    width: 82,
                                                    dataIndex: 'ACCOUNT',
                                                    align: 'center',
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'SOCIETY',
                                                    width: 75,
                                                    menuDisabled: true,
                                                    dataIndex: 'SOCIETY',
                                                    align: 'center',
                                                    style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #8A7155;color:white";
                                                        return '';
                                                    }
                                                },
                                        ]
                                    },
                                    {
                                        text: 'AMOUNT', 
                                        style: 'background: #8A7155;border-color:white',
                                        columns: [
                                             {
                                        text: 'CURR',
                                        width: 70,
                                        menuDisabled: true,
                                        dataIndex: 'SCURRENCY',
                                        align: 'center',
                                        style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;background: #8A7155;color:white";
                                            return '';
                                        }
                                    },
                                    {
                                        text: 'NETO',
                                        menuDisabled: true,
                                        width: 75,
                                        dataIndex: 'NETO',
                                        align: 'center',
                                        style: 'padding: 2px; background: #8A7155 ;border-color:white',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridData212').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridData212').getStore().getData().items[0].data;
                                            console.log(data,'data')
                                            metaData.style = "text-align:right;background: #8A7155;color:white";
                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                            return '<b>' + value + '</b>';
                                        }
                                    }
                                        ]
                                    },
                                   
                                ]
                            },
                             defaults: {
                                sortable: true,
                                menuDisabled: false,
                                align: 'center'
                            }
                        },
                    ]
                },

                // --- Caja VENTAS ---
                {
                    xtype: 'panel',
                    width: 860,
                    border: false,
                    margin: '8 8 8 0',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    bodyPadding: 5,
                    bodyStyle: 'background-color: #F4F7FD;',
        //            style: 'border:2px solid #3F5675; border-radius:6px; background:#F8FAFC;',
                    items: [
                        // Filtros Ventas
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:4px;',
                            width: 850, 
                            defaults: {
                                margin: '0 10 0 0',
                                labelAlign: 'left',
                                labelStyle: 'font-size:12px; font-weight:bold;',
                                fieldStyle: 'font-size:12px; text-align:center;'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Agent',
                                    id: prototype.id + '-txtAgentSale',
                                    width: 120,
                                    labelWidth: 40,
                                    enableKeyEvents: true,
                                    hidden:true,
                                    listeners: { keypress: 'searchSales' }
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    hidden:true,
                                    id: prototype.id + '-txtCountrySale',
                                    width: 180,
                                    labelWidth: 50,
                                    emptyText: 'All',
                                    displayField: 'A006NOMBRE',
                                    valueField: 'A006PAIS',
                                    queryMode: 'local',
                                    editable: true,
                                    forceSelection: true,
                                    listeners: { keypress: 'searchSales' }
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Sale Date From',
                                    id: prototype.id + '-txtFromSale',
                                    format: 'Y/m/d',
                                    value: new Date(),
                                    width: 200,
                                    labelWidth: 100
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Sale Date To',
                                    id: prototype.id + '-txtToSale',
                                    format: 'Y/m/d',
                                    value: new Date(),
                                    width: 190,
                                    labelWidth: 85
                                },
                               {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkMarkSales',
                                    fieldLabel: 'Mark All', 
                                    labelWidth: 60,   
                                    boxLabel: '',  
                                    checked: false,
                                    labelStyle: 'font-weight:bold;',
                                    listeners: { change: 'markAllGridSale' }
                                },
                               {
                                    xtype: 'button',
                                    id: prototype.id + '-btnSearchSales',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search'
                                },

                            ]
                        },
                        // Grid Ventas
                       {
                                xtype: 'grid',
                                id: prototype.id + '-gridDataVentas',
                                height: 460,
                                width: 850,
                                hidden: false,
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
                                                text: 'DETAILS', 
                                                style: 'background: #3F5675;border-color:white',
                                                columns: [
                                                    {
                                            xtype: 'checkcolumn', 
                                            text: 'SEL', 
                                            width: 50, 
                                            dataIndex: 'checkActive',
                                            align: 'center',
                                            menuDisabled: true,
                                            style: 'padding:2px; background: #3F5675;border-color:white',
                                            listeners: {
                                                checkchange: 'updateGridSale'
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #3F5675;color:white";
                                                return '';
                                            }
                                        },
                                                    {
                                                        text: 'RN',
                                                        width: 45,
                                                        menuDisabled: true,
                                                        dataIndex: 'RN',
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
                                                        text: 'Ccust',
                                                        width: 90,
                                                        menuDisabled: true,
                                                        hidden: true,
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
                                                        text: 'Datec',
                                                        width: 90,
                                                        menuDisabled: true,
                                                        hidden: true,
                                                        dataIndex: 'DATEC',
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
                                                        text: 'Tranc',
                                                        width: 105,
                                                        menuDisabled: true,
                                                        hidden: true,
                                                        dataIndex: 'TRANC',
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
                                                        text: 'TICKET',
                                                        width: 105,
                                                        menuDisabled: true,
                                                        dataIndex: 'TKT',
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
                                                        text: 'AGENT',
                                                        width: 75,
                                                        menuDisabled: true,
                                                        dataIndex: 'SAGENT',
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
                                                        text: 'COUNTRY',
                                                        width: 75,
                                                        menuDisabled: true,
                                                        dataIndex: 'SCOUNTRY',
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
                                                        text: 'SAUTHOC',
                                                        width: 75,
                                                        menuDisabled: true,
                                                        dataIndex: 'SAUTHOC',
                                                        align: 'center',
                                                        style: 'padding:2px; background: #3F5675;border-color:white',
                                                        summaryType: 'sum',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
            //                                                value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;background: #3F5675;color:white";
                                                            return '';
                                                        }
                                                    },
                                                    {
                                                        text: 'SCARDN',
                                                        width: 80,
                                                        menuDisabled: true,
                                                        dataIndex: 'SCARDN',
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
                                                        text: 'SDATE',
                                                        width: 80,
                                                        menuDisabled: true,
                                                        dataIndex: 'SDATE',
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
                                                ]
                                        },
                                        {
                                            text: 'LOCAL', 
                                             style: 'background: #3F5675;border-color:white',
                                            columns: [
                                                {
                                            text: 'CURR',
                                            width: 54,
                                            menuDisabled: true,
                                            dataIndex: 'SCURREVEN',
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
                                            text: 'SVFOP',
                                            width: 70,
                                            menuDisabled: true,
                                            dataIndex: 'SVFOP',
                                            align: 'center',
                                            style: 'padding:2px; background: #3F5675;border-color:white',
                                            summaryType: 'sum',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;";
                                                value = Ext.util.Format.number(value, '0,000.00');
                                                return '<b>' + value + '</b>';
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                var tam = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items.length;
                                                var data = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items[0].data;
                                                metaData.style = "text-align:right;background: #3F5675;color:white";
                                                value = Ext.util.Format.number(data.TOTAL_SVFOP, '0,000.00');
                                                return '<b>' + value + '</b>';
                                            }
                                        },
                                            ]
                                        },
                                        {
                                            text: 'CONVERTED', 
                                             style: 'background: #3F5675;border-color:white',
                                            columns: [
                                                {
                                                text: 'CURR',
                                                width: 54,
                                                menuDisabled: true,
                                                dataIndex: 'SCURREVEN',
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
                                                text: 'SVFOP',
                                                width: 70,
                                                menuDisabled: true,
                                                dataIndex: 'SVFOPCON',
                                                align: 'center',
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                summaryType: 'sum',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridDataVentas').getStore().getData().items[0].data;
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    value = Ext.util.Format.number(data.TOTAL_SVFOP_CONVERTED, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            ]
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
               
                // --- Match ---
                {
                    xtype: 'panel',
                    width: 240,
                    border: false,
                    margin: '8 8 8 0',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    id: 'panelResumenTotalesSales',
                    bodyPadding: 5,
                    bodyStyle: 'background-color: #F4F7FD;',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            style: 'background:#E6ECF5; border:1px solid #99A9C4; padding:8px; border-radius:6px;',
                            width: 235,
                            defaults: {
                                margin: '4 0 4 0',
                                labelAlign: 'left',
                                labelStyle: 'font-size:12px; font-weight:bold;',
                                fieldStyle: 'font-size:12px; text-align:center;'
                            },
                            items: [
                                // Panel Total Depósitos
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            value: 'Total Deposito',
                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: prototype.id + '-txtTotalDeposito',
                                            width:'110px',
                                            value: Ext.util.Format.number(0, '0,000.00'),
                                            style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                        }
                                    ]
                                },
                                // Panel Total Ventas
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            value: 'Total Ventas',
                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: prototype.id + '-txtVentas',
                                            width:'110px',
                                            value: Ext.util.Format.number(0, '0,000.00'),
                                            style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                        }
                                    ]
                                },
                                // Panel Cálculo Diferencia
                                {
                                    xtype: 'panel',
                                    itemId: prototype.id + '-panelDiffVenta',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            value: 'Diferencia',
                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: prototype.id + '-txtTotalDiffVenta',
                                            width:'110px',
                                            value: Ext.util.Format.number(0, '0,000.00'),
                                            style: 'font-size:14px; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                        }
                                    ]
                                },
                                // Panel Porcentaje  Permitido
                                {
                                    xtype: 'panel',
                                    itemId: prototype.id + '-panelPercent',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            value: 'Porcentaje',
                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 110px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: prototype.id + '-txtPercentVenta',
                                            width:'110px',
                                            value: Ext.util.Format.number(0, '0,000.00'),
                                            style: 'font-size:14px; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                        }
                                    ]
                                },
                                // Botón Execute alineado a la derecha
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnExecuteSale',
                                            width: 110,
                                            html: '<span style="color:white;font-size:12px;font-weight:bold">Execute</span>',
                                            style: 'background:#3F5675; border-radius:4px; padding:4px 8px;',
                                            border: false,
                                            listeners: {
                                                click: 'verifyConciliationSale'
                                            }
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
