Ext.define('Ext.Praxis.view.payments.CargoGuideForm.RunProcessForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.RunProcessForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoGuide.RunProcessController'
    ],
    controller: 'RunProcessController',
    title: 'Run Process',
    height: 400,
    width: 480,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {border: false},
    items: [
        {
            xtype: 'form',
            bodyPadding: '18 24 10 24',
            border: false,
            defaults: {border: false},
            items: [
                // ── Section: Configuration ──────────────────────────────
                {
                    xtype: 'label',
                    text: 'Process Configuration',
                    cls: 'section-title',
                    margin: '0 0 8 0'
                },
                {
                    xtype: 'container',
                    style: 'background:#F4F7FD; border-radius:4px; padding:14px 18px;',
                    margin: '0 0 14 0',
                    layout: {type: 'vbox', align: 'stretch'},
                    items: [
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            margin: '0 0 10 0',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    width: 80,
                                    style: 'font-weight:bold; color:#0B333C; line-height:24px;'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-rp-cmbCountry',
                                    width: 240,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    emptyText: '-- Select a country --',
                                    valueField: 'code',
                                    displayField: 'name',
                                    fieldStyle: 'text-align:center; font-weight:bold;',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'CO', name: 'Colombia (CO)'},
                                            {code: 'HN', name: 'Honduras (HN)'},
                                            {code: 'SV', name: 'El Salvador (SV)'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'onCountryChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            margin: '0 0 10 0',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Process',
                                    width: 80,
                                    style: 'font-weight:bold; color:#0B333C; line-height:24px;'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-rp-cmbProcess',
                                    width: 240,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    disabled: true,
                                    emptyText: '-- Select country first --',
                                    valueField: 'code',
                                    displayField: 'name',
                                    fieldStyle: 'text-align:center; font-weight:bold;',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['code', 'name', 'available', 'proc']
                                    }),
                                    listeners: {
                                        change: 'onProcessChange'
                                    }
                                }
                            ]
                        },
                        {
                            // Aplica a los países cuya conciliación corre vía endpoint
                            // REST del backend Python (HN, SV — ver _PAISES_CON_FECR en
                            // RunProcessController.js). Oculto para los demás países.
                            xtype: 'container',
                            id: prototype.id + '-rp-rowFecr',
                            hidden: true,
                            layout: {type: 'hbox', align: 'middle'},
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'FECR',
                                    width: 80,
                                    style: 'font-weight:bold; color:#0B333C; line-height:24px;'
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-rp-fldFecr',
                                    width: 240,
                                    format: 'Y-m-d',
                                    editable: false
                                }
                            ]
                        }
                    ]
                },
                // ── Section: Execution Info ─────────────────────────────
                {
                    xtype: 'label',
                    text: 'Execution Info',
                    cls: 'section-title',
                    margin: '4 0 8 0'
                },
                {
                    xtype: 'container',
                    id: prototype.id + '-rp-infoBox',
                    style: 'background:#EBF4FB; border-left:4px solid #2196F3; border-radius:3px; padding:12px 16px; min-height:64px;',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'displayfield',
                            id: prototype.id + '-rp-lblInfo',
                            value: '<span style="color:#7f8c9a; font-style:italic;">Select a country and process to see execution details.</span>',
                            fieldStyle: 'font-size:12px; line-height:18px;'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {pack: 'center'},
            defaults: {scale: 'medium'},
            items: [
                {
                    text: 'Execute',
                    id: prototype.id + '-rp-btnExecute',
                    iconCls: 'prx-icon-update',
                    disabled: true,
                    listeners: {click: 'onExecuteClick'}
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-rp-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCancelClick'}
                }
            ]
        }
    ]
});
