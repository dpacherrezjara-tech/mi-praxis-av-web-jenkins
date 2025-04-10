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
    layout: { type: 'fit' },
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
                                                            width: 663,
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
                                                                        xtype: 'checkcolumn', // Columna de checkbox
                                                                        text: 'Select', // Título de la columna
                                                                        width: 60, // Ancho de la columna
                                                                        dataIndex: 'checkActive', // Campo en el store que almacena el estado del checkbox
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        menuDisabled: true,
                                                                        listeners: {
                                                                            checkchange: 'updateGridBandoc' // Cambiado de 'change' a 'checkchange'
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
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Society',
                                                                        width: 110,
                                                                        menuDisabled: true,
                                                                        dataIndex: 'SOCIETY',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Neto',
                                                                        menuDisabled: true,
                                                                        width: 110,
                                                                        dataIndex: 'NETO',
                                                                        align: 'center',
                                                                        style: 'padding: 6px; background: #B8A189 ;border-color:white',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                                            return '<b>' + value + '</b>';
                                                                        }
                                                                    },
                                                                ]
                                                            }
                                                        },,
                                                        {xtype: 'tbspacer', width: 30, height:20},
                                                        {
    xtype: 'panel',
    layout: 'vbox',
    id: 'panelResumenTotales',
    width: 258,
    style: 'background: #ffffff; border: 1px solid #d1d1d1;',
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
                    value: 'Total Liquidaciones',
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
        // Panel para el Total de Descuentos
        {
            xtype: 'panel',
            layout: 'hbox',
            border: false,
            style: 'border-bottom: 1px solid #d1d1d1;',
            items: [
                {
                    xtype: 'displayfield',
                    value: 'Total Descuentos',
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
            value: 'Diferencia',
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
,
        // Panel para el Total Depósito
        {
            xtype: 'panel',
            itemId: prototype.id + '-panelBandoc',
            layout: 'hbox',
            border: false,
            style: 'border-bottom: 1px solid #d1d1d1;',
            items: [
                {
                    xtype: 'displayfield',
                    value: 'Total Depósito',
                    style: 'font-size:14px; font-weight: bold; color:#333; width: 150px; border-right: 1px solid #d1d1d1; padding: 4px 10px;'
                },
                {
                    xtype: 'displayfield',
                    id: prototype.id + '-txtTotalBandocGrid',
                    value: Ext.util.Format.number(0, '0,000.00'),
                    style: 'font-size:14px; color:white; font-weight: bold; width: 106px; text-align: right; padding: 4px 10px;'
                }
            ]
        }
    ]
}

                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: 30, height:20},
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
                                                        { xtype: 'tbspacer', height: 10 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                                                { xtype: 'tbspacer', width: 10 },
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
                                                                    listConfig: { maxHeight: 111, minWidth: 70 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                                                { xtype: 'tbspacer', width: 10 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                                                { xtype: 'tbspacer', width: 10 }, // Espacio entre "Desde" y "Hasta"
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
                                                                    listConfig: { maxHeight: 111, minWidth: 70 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                                        { xtype: 'tbspacer', height: 10 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                                                { xtype: 'tbspacer', width: 10 }, // Espacio entre "Desde" y "Hasta"
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
                                                                    listConfig: { maxHeight: 111, minWidth: 70 },
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
                                                                    listConfig: { minWidth: 60 },
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
                                            height: 700,
                                            layout: 'fit',
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
                                                            id: prototype.id + '-contentInfo'
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