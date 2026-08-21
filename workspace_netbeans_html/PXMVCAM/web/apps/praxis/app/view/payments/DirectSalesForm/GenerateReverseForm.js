Ext.define('Ext.Praxis.view.payments.DirectSalesForm.GenerateReverseForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.GenerateReverseDirectSalesForm',
    requires: [
        'Ext.Praxis.controller.payments.DirectSales.GenerateReverseDirectSalesController'
    ],
    controller: 'GenerateReverseDirectSalesController',
    title: 'Sales Negative',
    
    // Ancho y alto fijos para evitar el renderizado incompleto, pero permitiendo maximizar
    width: 1300,
    height: 680,
    minWidth: 1100,
    minHeight: 520,
    constrain: true, 
    maximizable: true, 
    
    header: true,
    resizable: true,
    modal: true,
    border: false,
    
    // 1. CAMBIO CLAVE: Usamos 'border' layout. Es el más robusto para llenar ventanas.
    layout: 'border', 
    
    bodyStyle: 'background-color: #F4F7FD;',
    bodyPadding: '10 10 10 10', 
    
    listeners: {
        afterrender: 'onWinAfterRender'
    },
    
    items: [
        // --- SECCIÓN DE FILTROS (NORTE) ---
        {
            xtype: 'fieldset',
            region: 'north', // 2. Le decimos que se ancle en la parte superior
            title: '<span style="color:#1A4D8F;font-weight:bold;font-size:13px;">FILTERS</span>',
            style: 'border: 1px solid #1A4D8F; padding: 10px 15px; margin: 0 0 10px 0; background-color: #FFFFFF; border-radius: 4px;',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                labelAlign: 'right',
                labelStyle: 'font-size: 12px; font-weight: bold; color: #333;',
                margin: '0 15 0 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    id: prototype.id + '-grv-txtAgent',
                    fieldLabel: 'Agent',
                    labelWidth: 40,
                    width: 160,
                    maxLength: 8,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    listeners: { specialkey: 'eventKey' }
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'From',
                    labelWidth: 40,
                    layout: 'hbox',
                    defaults: { margin: '0 5 0 0' },
                    items: [
                        {
                            xtype: 'combo', id: prototype.id + '-grv-cmbDateFromYear', width: 80, editable: false, queryMode: 'local', triggerAction: 'all',
                            valueField: 'code', displayField: 'name', emptyText: 'YYYY', listConfig: {maxHeight: 150}, maxLength: 4, enforceMaxLength: true, maskRe: /[0-9]/,
                            listeners: { select: 'selectComboFromYear' }
                        },
                        {
                            xtype: 'combo', id: prototype.id + '-grv-cmbDateFromMonth', width: 60, editable: false, queryMode: 'local', triggerAction: 'all',
                            valueField: 'code', displayField: 'name', emptyText: 'MM', listConfig: {maxHeight: 150}, maxLength: 3, enforceMaxLength: true,
                            listeners: { select: 'selectComboFromMonth' }
                        },
                        {
                            xtype: 'combo', id: prototype.id + '-grv-cmbDateFromDay', width: 60, editable: false, queryMode: 'local', triggerAction: 'all',
                            valueField: 'code', displayField: 'name', emptyText: 'DD', listConfig: {maxHeight: 150}, margin: '0',
                            listeners: { select: 'selectComboFromDay' }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'To',
                    labelWidth: 30,
                    layout: 'hbox',
                    defaults: { margin: '0 5 0 0' },
                    items: [
                        { xtype: 'combo', id: prototype.id + '-grv-cmbDateToYear', width: 80, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', emptyText: 'YYYY', listConfig: {maxHeight: 150}, maxLength: 4, enforceMaxLength: true, maskRe: /[0-9]/ },
                        { xtype: 'combo', id: prototype.id + '-grv-cmbDateToMonth', width: 60, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', emptyText: 'MM', listConfig: {maxHeight: 150}, maxLength: 3, enforceMaxLength: true },
                        { xtype: 'combo', id: prototype.id + '-grv-cmbDateToDay', width: 60, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', emptyText: 'DD', listConfig: {maxHeight: 150}, margin: '0' }
                    ]
                },
                
                // 3. CAMBIO: Usamos un componente flex en lugar de tbfill en hbox para asegurar que los botones vayan a la derecha sin romper el ancho.
                { xtype: 'component', flex: 1 }, 
                
                {
                    xtype: 'button',
                    id: prototype.id + '-grv-btnSearch',
                    iconCls: 'prx-icon-search',
                    text: 'Search',
                    width: 90,
                    margin: '0 8 0 0',
                    listeners: { click: 'btnSearch_click' }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-grv-btnClear',
                    iconCls: 'prx-icon-clear',
                    text: 'Clear',
                    width: 90,
                    margin: '0',
                    listeners: { click: 'btnClear_click' }
                }
            ]
        },

        // --- SECCIÓN DEL GRID (CENTRO) ---
        {
            xtype: 'grid',
            region: 'center', // 4. El centro toma TODO el espacio restante de la ventana automáticamente
            id: prototype.id + '-grv-grid',
            border: true,
            columnLines: true,
            viewConfig: {
                enableTextSelection: true,
                stripeRows: true,
                // Fila ya generada (MPS739 le asigno Bandoc): se pinta distinto
                // y el tooltip "INVOICE CONCILIADO" se arma en el controller
                // (onWinAfterRender), delegado a esta misma clase.
                getRowClass: function (record) {
                    return record.get('BANDOC') ? 'grv-row-conciliado' : '';
                }
            },
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI',
                showHeaderCheckbox: true
            },
            tbar: [
                '->', 
                {
                    xtype: 'button', id: prototype.id + '-grv-btnReversaMasiva', text: 'Reversa Masiva', iconCls: 'prx-icon-cancel', disabled: true, tooltip: 'Reversar todas las ventas seleccionadas', margin: '0 8 0 0', listeners: { click: 'onReversaMasivaClick' }
                },
                {
                    xtype: 'button', id: prototype.id + '-grv-btnGenerarMasivo', text: 'Generar Masivo', iconCls: 'prx-icon-update', disabled: true, tooltip: 'Generar todas las ventas seleccionadas', listeners: { click: 'onGenerarMasivoClick' }
                }
            ],
            store: {
                // Nombres de campo iguales a los que devuelve MPS738 (bean MPF300),
                // asi el store carga directo la respuesta del backend sin mapear.
                // BANDOC: vacio = pendiente de Generar; con valor = ya conciliado
                // (usado por getRowClass para pintar la fila distinto).
                fields: ['CCUST', 'SCOUNTRY', 'SDATE', 'SAGENT', 'SUBFTE', 'INVOICE', 'SCURRENCY', 'MONTO', 'BANDOC'],
                data: []
            },
            columns: {
                defaults: { menuDisabled: true, sortable: true, align: 'center', style: 'padding:4px; background: #6C87A8; border-color:white;' },
                items: [
                    { text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 90 },
                    { text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 80 },
                    { text: '<span style="color:white;font-weight:bold;">Sales Date</span>', dataIndex: 'SDATE', width: 100 },
                    { text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90 },
                    { text: '<span style="color:white;font-weight:bold;">Source</span>', dataIndex: 'SUBFTE', width: 100 },
                    {
                        text: '<span style="color:white;font-weight:bold;">Invoice</span>',
                        dataIndex: 'INVOICE',
                        flex: 1, 
                        minWidth: 150,
                        renderer: function (value, metaData) {
                            metaData.style = 'text-align:center; font-size:11px; font-weight:bold; color:#1A4D8F;';
                            return value;
                        }
                    },
                    { text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 90 },
                    {
                        text: '<span style="color:white;font-weight:bold;">Monto Venta</span>',
                        dataIndex: 'MONTO', width: 130, align: 'right',
                        renderer: function (value, metaData) {
                            metaData.style = 'text-align:right; font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: '<span style="color:white;font-weight:bold;">Opciones</span>',
                        columns: [
                            {
                                text: '<span style="color:white;font-weight:bold;">Reversa</span>', width: 95, align: 'center', style: 'padding:2px; background: #6C87A8; border-color:white;',
                                renderer: function () { return '<span style="display:inline-block;padding:4px 12px;background:#e74c3c;color:#fff;border-radius:3px;font-size:11px;font-weight:bold;cursor:pointer;box-shadow: 0 1px 2px rgba(0,0,0,0.2);">REVERSA</span>'; },
                                listeners: { click: 'onReversaClick' }
                            },
                            {
                                text: '<span style="color:white;font-weight:bold;">Generar</span>', width: 95, align: 'center', style: 'padding:2px; background: #6C87A8; border-color:white;',
                                renderer: function () { return '<span style="display:inline-block;padding:4px 12px;background:#27ae60;color:#fff;border-radius:3px;font-size:11px;font-weight:bold;cursor:pointer;box-shadow: 0 1px 2px rgba(0,0,0,0.2);">GENERAR</span>'; },
                                listeners: { click: 'onGenerarClick' }
                            }
                        ]
                    }
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 5 0',
            layout: { pack: 'center' },
            items: [
                {
                    text: 'Close Window',
                    id: prototype.id + '-grv-btnClose',
                    iconCls: 'prx-icon-cancel',
                    scale: 'medium',
                    width: 120,
                    listeners: { click: 'onCloseClick' }
                }
            ]
        }
    ]
});
Ext.util.CSS.createStyleSheet(`
    .grv-row-conciliado {
        background-color: #90CAF9 !important;
    }
    .grv-row-conciliado:hover {
        background-color: #64B5F6 !important;
    }
`, 'grv-row-conciliado-style');