Ext.define('Ext.Praxis.view.payments.DirectSalesForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    // Usamos 'fit' para que el contenido ocupe todo el panel
    layout: 'fit', 
    items: [
        {
            xtype: 'fieldset',
            id: prototype.id + '-titleFieldsetBSP',
            title: '<span style="color:#1A4D8F;font-weight:bold;">FILTERS</span>',
            style: 'border: 1px solid #1A4D8F; padding: 10px; margin: 10px 15px;',
            
            // EL CAMBIO PRINCIPAL: Usamos un layout de columnas para que fluyan 
            // horizontalmente. Si no caben, bajan automáticamente.
            layout: 'column', 
            
            defaults: {
                // Configuraciones por defecto para todos los campos directos
                labelAlign: 'right',
                labelStyle: 'font-size: 12px;',
                fieldStyle: 'text-align: center; font-size: 12px;',
                margin: '0 10 5 0' // Margen inferior (5) por si bajan de línea
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbInputDate',
                    fieldLabel: 'Search By',
                    labelWidth: 60,
                    width: 170,
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    value: 'A',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: 'S', name: 'Sales Date'},
                            {code: 'A', name: 'Abono Date'}
                        ]
                    },
                    listeners: { change: 'btnSearch_click' }
                },
                
                // Agrupamos las fechas "From" para mantenerlas juntas
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'From',
                    labelWidth: 35,
                    layout: 'hbox',
                    margin: '0 10 5 0',
                    defaults: { margin: '0 5 0 0' },
                    items: [
                        { xtype: 'combo', id: prototype.id + '-cmbDateFromYear', width: 80, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', listConfig: {maxHeight: 111}, maxLength: 4, enforceMaxLength: true, maskRe: /[0-9]/ },
                        { xtype: 'combo', id: prototype.id + '-cmbDateFromMonth', width: 50, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', listConfig: {maxHeight: 111}, maxLength: 3, enforceMaxLength: true },
                        { xtype: 'combo', id: prototype.id + '-cmbDateFromDay', width: 50, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', emptyText: 'All', listConfig: {maxHeight: 111}, margin: '0' }
                    ]
                },
                
                // Agrupamos las fechas "To"
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'To',
                    labelWidth: 20,
                    layout: 'hbox',
                    margin: '0 10 5 0',
                    defaults: { margin: '0 5 0 0' },
                    items: [
                        { xtype: 'combo', id: prototype.id + '-cmbDateToYear', width: 80, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', listConfig: {maxHeight: 111}, maxLength: 4, enforceMaxLength: true, maskRe: /[0-9]/ },
                        { xtype: 'combo', id: prototype.id + '-cmbDateToMonth', width: 50, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', listConfig: {maxHeight: 111}, maxLength: 3, enforceMaxLength: true },
                        { xtype: 'combo', id: prototype.id + '-cmbDateToDay', width: 50, editable: false, queryMode: 'local', triggerAction: 'all', valueField: 'code', displayField: 'name', emptyText: 'All', listConfig: {maxHeight: 111}, margin: '0' }
                    ]
                },
                
                {
                    xtype: 'combo',
                    id: prototype.id + '-typeSociety',
                    fieldLabel: 'Customer',
                    labelWidth: 55,
                    width: 150,
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    value: '',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '729', name: 'TAMPA'},
                            {code: '133', name: 'LACSA'},
                            {code: '134', name: 'AVIANCA'},
                            {code: '202', name: 'TACA'},
                            {code: '547', name: 'AEROGAL'},
                            {code: '', name: 'All'}
                        ]
                    },
                    listeners: { change: 'btnSearch_click' }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    fieldLabel: 'Country',
                    labelWidth: 45,
                    width: 180,
                    queryMode: 'local',
                    allowBlank: true,
                    forceSelection: true,
                    editable: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listeners: { change: 'btnSearch_click' }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAgent',
                    fieldLabel: 'Agent',
                    labelWidth: 40,
                    width: 120,
                    maxLength: 10,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    listeners: { keypress: 'eventKey' }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCurrency',
                    hidden: true,
                    fieldLabel: 'Currency',
                    labelWidth: 55,
                    width: 150,
                    queryMode: 'local',
                    forceSelection: true,
                    editable: true,
                    valueField: 'A005KEY',
                    displayField: 'A005KEY2',
                    value: ''
                },
                
                // --- LOS CAMPOS QUE ANTES ESTABAN ABAJO, AHORA SIGUEN EN LA MISMA LISTA ---
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
                    hidden: true,
                    fieldLabel: 'Status',
                    labelWidth: 45,
                    width: 150,
                    queryMode: 'local',
                    forceSelection: true,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    value: '',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '', name: 'All'},
                            {code: '1', name: 'Match'},
                            {code: '5', name: 'Match Manual'},
                            {code: '3', name: 'Pending'}
                        ]
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtNeto',
                    hidden: true,
                    fieldLabel: 'Neto',
                    labelWidth: 35,
                    width: 110,
                    fieldStyle: 'text-align: right; font-size: 12px;',
                    maskRe: /[0-9.\-]/,
                    maxLength: 20,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    listeners: { keypress: 'eventKey' }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtPayamou',
                    hidden: true,
                    fieldLabel: 'Payamou',
                    labelWidth: 55,
                    width: 120,
                    fieldStyle: 'text-align: right; font-size: 12px;',
                    maskRe: /[0-9.\-]/,
                    maxLength: 20,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    listeners: { keypress: 'eventKey' }
                },
                
                // --- EL SWITCH Y BOTON AL FINAL ---
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    margin: '0 0 5 5',
                    items: [
                        {
                            xtype: 'label', text: 'Dashboard', margin: '0 5 0 0', id: prototype.id + '-dashboardDS'
                        },
                        {
                            xtype: 'component',
                            id: prototype.id + '-btnToggleSwitchDashboardDetail',
                            margin: '0 5 0 0',
                            html: `<style>
                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                .toggle-input{opacity:0;width:0;height:0;}
                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                            </style>
                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`
                        },
                        {
                            xtype: 'label', text: 'Detail', margin: '0 10 0 5', id: prototype.id + '-detailDS'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSalesNegative',
                            text: 'Sales Negative',
                            tooltip: 'Generar / Reversar Venta Directa'
                        }
                    ]
                }
            ]
        }
    ]
});