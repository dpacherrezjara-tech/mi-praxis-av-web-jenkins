Ext.create('Ext.Component', {
    renderTo: Ext.getBody(),
    html: '<style type="text/css">' +
            '.button-off {' +
            '  background-color: #f44336;' + // Red color for OFF
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '.button-on {' +
            '  background-color: #4CAF50;' + // Green color for ON
            '  color: white;' +
            '  border-radius: 50%;' +
            '  border: none;' +
            '  font-size: 12px;' +
            '  cursor: pointer;' +
            '  text-align: center;' +
            '  line-height: 50px;' + // Ensure text is vertically centered
            '}' +
            '</style>'
});

Ext.define('Ext.Praxis.view.payments.TemplateReconciliationForm.TemplateReconciliationForm', {
    id: prototype.id,
    url: prototype.url,
    extend: 'Ext.panel.Panel',
    alias: 'widget.TemplateReconciliationForm',
    requires: [
        'Ext.Praxis.view.payments.TemplateReconciliationForm.Filters',
        'Ext.Praxis.view.payments.TemplateReconciliationForm.Options',
        'Ext.Praxis.view.payments.TemplateReconciliationForm.Info',
        'Ext.Praxis.controller.payments.TemplateReconciliation.TemplateReconciliationController'
    ],
    controller: 'TemplateReconciliationController',
    layout: {type: 'fit'},
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPrincipal',
                            hidden: false,
                            width: 1000,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel', // Panel principal
                                            layout: {
                                                type: 'hbox', // Layout horizontal para dividir en dos columnas
                                                align: 'stretch'
                                            },
                                            margin: '10px 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel', // Columna izquierda
                                                    layout: {
                                                        type: 'hbox', // Layout horizontal
                                                        align: 'top' // Cambiado a 'top' para evitar que los elementos se estiren verticalmente
                                                    },
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            title: '<span style="color:#1a4d8f;font-weight:bold;">FILTERS</span>',
                                                            width: 440,
                                                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                                            layout: 'hbox',
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
                                                                    margin: '0 10 0 0',
                                                                    listeners: {
                                                                        change: 'changeProcessor'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle'
                                                                    },
                                                                    padding: '0 10 5 10',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Work Mode',
                                                                            margin: '0 5 0 0',
                                                                            width: 60,
                                                                            id: prototype.id + '-WorkMode'
                                                                        },
                                                                        {
                                                                            xtype: 'component',
                                                                            id: prototype.id + '-btnToggleSwitch',
                                                                            margin: '0 5 0 0',
                                                                            html: `<style>
                                                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                                                .toggle-input{opacity:0;width:0;height:0;}
                                                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                                                            </style>
                                                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                                                            tooltip: 'Export to Report',
                                                                            listeners: {
                                                                                change: 'chgBash',
                                                                                click: 'chgBash'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Review Mode',
                                                                            margin: '0 0 0 5',
                                                                            width: 70,
                                                                            id: prototype.id + '-ReviewMode'
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },

                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: "Bandoc <span style='color:#B8A189 ; font-size: 16px; font-weight: bold;'>(*)</span>",
                                                            labelStyle: 'text-align: left; font-size: 12px;',
                                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                                            id: prototype.id + '-txtBandoc',
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 10,
                                                            width: 180,
                                                            labelWidth: 80,
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                keypress: 'searchBandoc'
                                                            },
                                                            margin: '0 10 0 0' // Margen a la derecha para separar de la grilla
                                                        },
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridData21',
                                                            height: 108,
                                                            width: 665,
                                                            hidden: false,
                                                            columnLines: true,
                                                            features: [{
                                                                    dock: 'bottom',
                                                                    ftype: 'summary'
                                                                }
                                                            ],
                                                            margin: '0 10 0 0', // Margen a la derecha para separar de la grilla
                                                            columns: {
                                                                items: [
                                                                    {
                                                                        xtype: 'checkcolumn', // Columna de checkbox
                                                                        text: 'Select', // Título de la columna
                                                                        width: 60, // Ancho de la columna
                                                                        dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        menuDisabled: true,
                                                                        listeners: {
                                                                            checkchange: 'updateGridBandoc' // Cambiado de 'change' a 'checkchange'
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Bandoc',
                                                                        width: 90,
                                                                        dataIndex: 'BANDOC',
                                                                        align: 'center',
                                                                        menuDisabled: true,
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Val Date',
                                                                        width: 90,
                                                                        dataIndex: 'VALDATE',
                                                                        menuDisabled: true,
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Date',
                                                                        width: 90,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'ADATE',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Account',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'ACCOUNT',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Society',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SOCIETY',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            return '';
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'NETO',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var tam = Ext.getCmp(prototype.id + '-gridData21').getStore().getData().items.length;
                                                                            var data = Ext.getCmp(prototype.id + '-gridData21').getStore().getData().items[tam - 1].data;
                                                                            console.log(data, 'data')
                                                                            metaData.style = "text-align:right;background: #B8A189;color:white";
                                                                            value = Ext.util.Format.number(data.TOTAL_NETO, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            defaults: {
                                                                sortable: true,
                                                                menuDisabled: false,
                                                                align: 'center'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            id: 'panelResumenTotales',
                                                            width: 258,
                                                            style: 'background: #ffffff; border: 1px solid #d1d1d1;',
                                                            margin: '0 10 0 0', // Margen a la derecha para separar de la grilla
                                                            items: [
                                                                // Panel para el Total de Liquidaciones
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 1px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Total',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtTotalSettGrid',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
                                                                },
                                                                // Panel para la comision de Liquidaciones
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 1px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Comision',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtComisionSettGrid',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
                                                                },
                                                                // Panel para la Total de Ventas
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 1px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Ventas',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtVentasSettGrid',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; color:#4CAF50; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
                                                                },
                                                                // Panel para el Total de Descuentos
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 6px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Descuentos',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtTotalDescGrid',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; color:#FF5722; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
                                                                },
                                                                // Panel para la Diferencia
                                                                {
                                                                    xtype: 'panel',
                                                                    itemId: prototype.id + '-panelDiff',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 1px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Calculo',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtTotalDiffGrid',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'vbox',
                                                            id: 'panelResumenBandocMenosCalculo',
                                                            width: 198,
                                                            style: 'background: #ffffff; border: 1px solid #d1d1d1;',
                                                            margin: '0 10 0 0', // Margen a la derecha para separar de la grilla
                                                            items: [
                                                                // Panel para la diferencia entre el deposito y el calculo
                                                                {
                                                                    xtype: 'panel',
                                                                    itemId: prototype.id + '-panelBandoc',
                                                                    layout: 'hbox',
                                                                    border: false,
                                                                    style: 'border-bottom: 1px solid #d1d1d1;',
                                                                    items: [
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            value: 'Diferencia',
                                                                            style: 'font-size:14px; font-weight: bold; color:#333; width: 90px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                                                                        },
                                                                        {
                                                                            xtype: 'displayfield',
                                                                            id: prototype.id + '-txtTotalDiff',
                                                                            value: Ext.util.Format.number(0, '0,000.00'),
                                                                            style: 'font-size:14px; color:white; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                                                                        }
                                                                    ]
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
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 30, height: 20},
                                                {
                                                    xtype: 'panel', // Columna derecha
                                                    hidden: true,
                                                    layout: {
                                                        type: 'vbox', // Layout vertical para los filtros
                                                        align: 'stretch'
                                                    },
                                                    border: false,
//                                                    bodyStyle: {
//                                                        'background-color': '#D3D3D3', // Fondo gris claro
//                                                        'padding': '10px', // Padding interno
//                                                        'border-radius': '10px', // Bordes redondeados
//                                                        'border': '1px solid #ddd' // Borde sutil
//                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', height: 10},
                                                        /* Fila 1: Desde y Hasta (Desc) */
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'hbox', // Layout horizontal para agrupar "Desde" y "Hasta"
                                                                align: 'middle'
                                                            },
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromYearDesc',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#7A6F3F;color:white;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:8px'>From <span style='color:#7A6F3F; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 130,
                                                                    labelWidth: 68,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        change: 'cbxDateFromYear_changeHandlerDesc'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromMonthDesc',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelWidth: 0,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true,
                                                                    listeners: {
                                                                        change: 'cbxDateFromMonth_changeHandlerDesc'
                                                                    },
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateDayDesc',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    disabled: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%',
                                                                },
                                                                {xtype: 'tbspacer', width: 10},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToYearDesc',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#7A6F3F;color:white;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:6px'>To <span style='color:#7A6F3F; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 115,
                                                                    labelWidth: 53,
                                                                    labelAlign: 'left',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {maxHeight: 111, minWidth: 70},
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToMonthDesc',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToDayDesc',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    disabled: false,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'searchDiscounts'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 10},
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromYear',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#4A6F58;color:white;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:8px'>From <span style='color:#4A6F58; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 130,
                                                                    labelWidth: 68,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        change: 'cbxDateFromYear_changeHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromMonth',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelWidth: 0,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true,
                                                                    listeners: {
                                                                        change: 'cbxDateFromMonth_changeHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateDay',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    disabled: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%'
                                                                },
                                                                {xtype: 'tbspacer', width: 10}, // Espacio entre "Desde" y "Hasta"
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToYear',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#4A6F58;color:white;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:6px'>To <span style='color:#4A6F58; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 115,
                                                                    labelWidth: 53,
                                                                    labelAlign: 'left',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {maxHeight: 111, minWidth: 70},
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToMonth',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToDay',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    disabled: false,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'searchSettlements'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 10},
                                                        /* Fila 3: Desde y Hasta (Normal) */
                                                        {
                                                            xtype: 'panel',
                                                            layout: {
                                                                type: 'hbox', // Layout horizontal para agrupar "Desde" y "Hasta"
                                                                align: 'middle'
                                                            },
                                                            border: false,
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromYearHead',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#3F5675;color:white;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:8px'>From <span style='color:#3F5675; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 130,
                                                                    labelWidth: 68,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        change: 'cbxDateFromYear_changeHandlerHead'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateFromMonthHead',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelWidth: 0,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true,
                                                                    listeners: {
                                                                        change: 'cbxDateFromMonth_changeHandlerHead'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateDayHead',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    disabled: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%'
                                                                },
                                                                {xtype: 'tbspacer', width: 10}, // Espacio entre "Desde" y "Hasta"
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToYearHead',
                                                                    labelStyle: 'text-align: left; font-size: 12px;background:#3F5675;color:white;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: "<span style='margin-left:6px'>To <span style='color:#3F5675; font-size: 16px; font-weight: bold;color:white'>(*)</span></span>",
                                                                    width: 115,
                                                                    labelWidth: 53,
                                                                    labelAlign: 'left',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {maxHeight: 111, minWidth: 70},
                                                                    maxLength: 4,
                                                                    enforceMaxLength: true,
                                                                    maskRe: /[0-9]/
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToMonthHead',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    disabled: false,
                                                                    editable: false,
                                                                    fieldLabel: '',
                                                                    width: 50,
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    listConfig: {minWidth: 60},
                                                                    maxLength: 3,
                                                                    enforceMaxLength: true
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbDateToDayHead',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'text-align: left; font-size: 12px;',
                                                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    autoSelect: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    disabled: false,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    width: 45,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'searchHead'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 550,
                                            layout: 'fit',
                                            id: prototype.id + '-centerC-panel02',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    width: '100%',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo',
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
        }
    ]
});