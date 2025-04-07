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
                    style: 'background: rgb(227, 234, 249); border: 1px solid #D6E4FF; padding: 10px 0;',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCOREP',
                            fieldLabel: 'Processor',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            width: 225,
                            labelWidth: 60,
                            emptyText: 'All',
                            value: [],
                            displayField: 'NAME',
                            valueField: 'VALUE',
                            queryMode: 'local',
                            filterPickList: true,
                            editable: true,
                            forceSelection: true,
                            margin: '0 10px 0 0' // Espacio entre los combos
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Avianca Group',
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            width: 190,
                            labelWidth: 85,
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
                            fieldLabel: "Merchant:",
                            labelStyle: 'text-align: left; font-size: 12px;',
                            fieldStyle: 'text-align: center; font-size: 12px;',
                            id: prototype.id + '-txtMerchant',
                            enforceMaxLength: true,
//                            maskRe: /[0-9]/,
                            maxLength: 15,
                            width: 180,
                            labelWidth: 57,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'searchAllGrid'
                            },
                            margin: '0 10 0 0' // Margen a la derecha para separar de la grilla
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
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'searchAllGrid'
                            },
                            margin: '0 10 0 0' // Margen a la derecha para separar de la grilla
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExecute',
                            width: 90,
                            html: '<span style="color:white;font-size:12px;color:white;font-weight:bold">Execute</span>',
                            style: 'background:#3F5675;margin-top:1px',
                            border: false,
                            listeners: {
                                click: 'verifyConciliation'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: 'padding: 12px 0;',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataCabecera',
                            height: 180,
                            width: 1712,
                            hidden: false,
                            columnLines: true,
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: [
                                {
                                    xtype: 'checkcolumn', // Columna de checkbox
                                    text: 'Select', // Título de la columna
                                    width: 60, // Ancho de la columna
                                    dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                    align: 'center',
                                    menuDisabled: true,
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                                    style: 'padding: 5px; background: #3F5675;border-color:white',
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
                            ]
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
                            xtype: 'container',
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 945,
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
                                                        text: 'Select', // Título de la columna
                                                        width: 60, // Ancho de la columna
                                                        menuDisabled: true,
                                                        dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        listeners: {
                                                            checkchange: 'updateTotalsOnCheck' // Cambiado de 'change' a 'checkchange'
                                                        }
                                                    },
                                                    
                                                    {
                                                        text: 'Amounts A',
                                                        menuDisabled: true,
                                                        style: 'background: #3D5C4A  ;border-color:white',
                                                        columns: [
                                                            {
                                                                text: 'Currency',
                                                                width: 90,
                                                                dataIndex: 'SCURRENCY',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                width: 90,
                                                                dataIndex: 'TOTAL',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Comision',
                                                                width: 90,
                                                                dataIndex: 'COMISION',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Comistota',
                                                                width: 90,
                                                                menuDisabled: true,
                                                                dataIndex: 'COMISTOTA',
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Neto',
                                                                width: 90,
                                                                dataIndex: 'NETO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_NETO, '0,000') + '<b>';
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
                                                                text: 'Moneda Pago',
                                                                width: 90,
                                                                dataIndex: 'MONEDAPAGO',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Import Pag',
                                                                width: 90,
                                                                dataIndex: 'IMPORTEPAG',
                                                                menuDisabled: true,
                                                                align: 'center',
                                                                style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Date',
                                                        width: 90,
                                                        dataIndex: 'ADATE',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Liquidation',
                                                        width: 90,
                                                        dataIndex: 'LIQUIDACIO',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Merchant',
                                                        width: 90,
                                                        dataIndex: 'MERCHAND',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Processor',
                                                        width: 90,
                                                        dataIndex: 'CODPRO',
                                                        menuDisabled: true,
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status',
                                                        width: 90,
                                                        menuDisabled: true,
                                                        dataIndex: 'STVAL',
                                                        align: 'center',
                                                        style: 'padding: 5px;background: #3D5C4A  ;border-color:white',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value == 3) {
                                                                metaData.style = 'background: #EF5350; color: white;'; // Rojo coral
                                                                return '<span style="font-weight: bold;">Pending</span>';
                                                            } else {
                                                                metaData.style = 'background: #4CAF50; color: white;'; // Verde para "Ok"
                                                                return '<span style="font-weight: bold;">Ok</span>';
                                                            }
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
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-SummarySett',
                                    width: 945,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#3D5C4A;color:white;text-align:right;font-weight:bold;border: 0.3px white solid;font-size:11px'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            width: 60,
                                            id: prototype.id + '-totQSALES',
                                            value: '180',
                                            fieldStyle: 'text-align: right; font-weight: bold;' // Opcional: estilo
                                        },
                                        {width: 90, id: prototype.id + '-totQSALESq', value: '180'},
                                        {width: 90, id: prototype.id + '-totASALES', value: '180'},
                                        {width: 90, id: prototype.id + '-perc1', value: '180'},
                                        {width: 90, id: prototype.id + '-totQMATCH', value: '180'},
                                        {width: 90, id: prototype.id + '-totAMATCH', value: '180'},
                                        {width: 90, id: prototype.id + '-totQPEND'},
                                        {width: 90, id: prototype.id + '-totAPEND'},
                                        {width: 90, id: prototype.id + '-perc3'},
                                        {width: 90, id: prototype.id + '-perc31'},
                                        {width: 90, id: prototype.id + '-perc312'},
                                        {width: 90, id: prototype.id + '-perc3121'},
                                        {width: 90, id: prototype.id + '-perc31211'},
                                        {width: 90, id: prototype.id + '-totQPOLIC'},
                                        {width: 90, id: prototype.id + '-totQPOLIPE'},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDescuentos',
                            width: 755,
                            height: 400,
                            margin: '10px 0 0 5px',
                            columnLines: true,
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: [
                                {
                                    text: 'Discounts',
                                    menuDisabled: true,
                                    style: 'background: #5F7480  ;border-color:white',
                                    columns: [
                                        {
                                            xtype: 'checkcolumn', // Columna de checkbox
                                            text: 'Select', // Título de la columna
                                            width: 60, // Ancho de la columna
                                            dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                            align: 'center',
                                            menuDisabled: true,
                                            style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                            listeners: {
                                                checkchange: 'updateGridDiscount' // Cambiado de 'change' a 'checkchange'
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                return '';
                                            }
                                        },
                                        {
                                            text: 'Codpro',
                                            width: 90,
                                            dataIndex: 'CODPRO',
                                            menuDisabled: true,
                                            align: 'center',
                                            style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                return value;
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                return '';
                                            }
                                        },
                                        {
                                            text: 'Merchand',
                                            width: 90,
                                            dataIndex: 'MERCHAND',
                                            menuDisabled: true,
                                            align: 'center',
                                            style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                return value;
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                return '';
                                            }
                                        },
                                        {
                                            text: 'Liquidation',
                                            width: 90,
                                            dataIndex: 'LIQUIDACIO',
                                            menuDisabled: true,
                                            align: 'center',
                                            style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                return value;
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                return '';
                                            }
                                        },
                                        {
                                            text: 'Fliquidaci',
                                            width: 90,
                                            dataIndex: 'FLIQUIDACI',
                                            menuDisabled: true,
                                            align: 'center',
                                            style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                return value;
                                            },
                                            summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                return '';
                                            }
                                        },
                                        {
                                            text: 'Amounts A',
                                            menuDisabled: true,
                                            style: 'background: #5F7480  ;border-color:white',
                                            columns: [
                                                {
                                                    text: 'Moneda',
                                                    width: 90,
                                                    dataIndex: 'MONEDA',
                                                    menuDisabled: true,
                                                    align: 'center',
                                                    style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'Importe',
                                                    width: 90,
                                                    menuDisabled: true,
                                                    dataIndex: 'IMPORTECeba',
                                                    align: 'center',
                                                    style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return '<b>' + value + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                        var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[tam-1].data;
                                                        metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                        value = Ext.util.Format.number(data.TOTAL_IMPORTE, '0,000.00');
                                                        return '<b>' + value + '</b>';
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            text: 'Amounts B',
                                            menuDisabled: true,
                                            style: 'background: #5F7480  ;border-color:white',
                                            columns: [
                                                {
                                                    text: 'Moneda Pago',
                                                    width: 110,
                                                    menuDisabled: true,
                                                    dataIndex: 'MONEDAPAGO',
                                                    align: 'center',
                                                    style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        return value;
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                        return '';
                                                    }
                                                },
                                                {
                                                    text: 'Importe Pag',
                                                    width: 110,
                                                    menuDisabled: true,
                                                    dataIndex: 'IMPORTEPAG',
                                                    align: 'center',
                                                    style: 'padding: 5px; background: #5F7480  ;border-color:white',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:right;";
                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return '<b>' + value + '</b>';
                                                    },
                                                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        var tam = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items.length;
                                                        var data = Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().getData().items[tam-1].data;
                                                        metaData.style = "text-align:right;background: #5F7480  ;color:white";
                                                        value = Ext.util.Format.number(data.TOTAL_IMPORTEPAG, '0,000.00');
                                                        return '<b>' + value + '</b>';
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
        }
    ]
});
