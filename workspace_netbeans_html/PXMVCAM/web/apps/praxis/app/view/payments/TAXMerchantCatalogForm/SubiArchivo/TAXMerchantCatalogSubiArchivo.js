prototype.idSA = prototype.id + '-SubiArchivo';

Ext.define('Ext.Praxis.view.payments.TAXMerchantCatalogForm.SubiArchivo.TAXMerchantCatalogSubiArchivo', {
    extend: 'Ext.window.Window',
    alias: 'widget.TAXMerchantCatalogSubiArchivo',
    requires: [
        'Ext.Praxis.controller.payments.TAXMerchantCatalog.TAXMerchantCatalogSubiArchivoController'
    ],
    controller: 'TAXMerchantCatalogSubiArchivoController',
    title: 'Carga Masiva - TAX Merchant Catalog',
    header: true,
    id: prototype.idSA + '-win',
    width: 900,
    height: 560,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                border: false,
                margin: '5 10 5 10'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.idSA + '-form',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    defaults: {
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            id: prototype.idSA + '-cmbMode',
                            fieldLabel: 'Modo',
                            labelWidth: 45,
                            width: 220,
                            name: 'IN_MODE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['C', 'Crear (Alta masiva)'],
                                    ['U', 'Actualizar (masiva)']
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: false,
                            emptyText: 'Seleccione...',
                            listeners: {
                                change: 'onModeOrFileChange'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Descargar layout de ejemplo',
                            iconCls: 'prx-icon-excel',
                            listeners: {
                                click: 'onDownloadLayout'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.idSA + '-form-file',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.idSA + '-File',
                            name: 'excelfile',
                            fieldLabel: 'Archivo',
                            labelWidth: 45,
                            width: 600,
                            allowBlank: true,
                            buttonText: 'Seleccionar archivo...',
                            listeners: {
                                change: 'onModeOrFileChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'label',
                    id: prototype.idSA + '-headerError',
                    hidden: true,
                    style: 'color:#a94442; font-weight:bold; white-space:normal;'
                },
                {
                    xtype: 'grid',
                    id: prototype.idSA + '-resultsGrid',
                    flex: 1,
                    hidden: true,
                    viewConfig: {
                        stripeRows: true
                    },
                    store: {
                        fields: ['ROW_NUM', 'PROCESO', 'MERCHANT', 'SALE_AGENT', 'PROCESSOR', 'CODE', 'ACTION', 'VALID', 'ERRORS'],
                        data: []
                    },
                    tbar: {
                        layout: {
                            pack: 'end'
                        },
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-excel',
                                scale: 'small',
                                tooltip: 'Exportar resultados a Excel',
                                listeners: {
                                    click: 'onDownloadResultsExcel'
                                }
                            }
                        ]
                    },
                    columns: [
                        {text: 'Fila', dataIndex: 'ROW_NUM', width: 50, align: 'center'},
                        {text: 'Proceso', dataIndex: 'PROCESO', width: 70},
                        {text: 'Merchant', dataIndex: 'MERCHANT', width: 100},
                        {text: 'Agente', dataIndex: 'SALE_AGENT', width: 90},
                        {text: 'Procesador', dataIndex: 'PROCESSOR', width: 80},
                        {text: 'Codigo', dataIndex: 'CODE', width: 90},
                        {
                            text: 'Accion',
                            dataIndex: 'ACTION',
                            width: 80,
                            renderer: function (v) {
                                if (v === 'C') { return 'Crear'; }
                                if (v === 'U') { return 'Actualizar'; }
                                return '';
                            }
                        },
                        {
                            text: 'Estado',
                            dataIndex: 'VALID',
                            width: 60,
                            align: 'center',
                            renderer: function (valid) {
                                return valid
                                        ? '<span style="color:#3c763d;font-weight:bold;" title="Fila valida">&#10003;</span>'
                                        : '<span style="color:#a94442;font-weight:bold;" title="Fila con errores">&#10007;</span>';
                            }
                        },
                        {
                            text: 'Mensaje',
                            dataIndex: 'ERRORS',
                            width: 450,
                            renderer: function (errors) {
                                if (!errors || errors.length === 0) {
                                    return '';
                                }
                                var text = errors.join(' | ');
                                return '<span title="' + Ext.String.htmlEncode(text) + '">' + Ext.String.htmlEncode(text) + '</span>';
                            }
                        }
                    ]
                },
                {
                    xtype: 'label',
                    id: prototype.idSA + '-summary',
                    hidden: true,
                    style: 'font-weight:bold;'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Validar',
                    id: prototype.idSA + '-btn-validate',
                    iconCls: 'prx-icon-search',
                    disabled: true,
                    listeners: {
                        click: 'onValidate'
                    }
                },
                {
                    text: 'Procesar',
                    id: prototype.idSA + '-btn-process',
                    iconCls: 'prx-icon-image-update',
                    disabled: true,
                    listeners: {
                        click: 'onProcess'
                    }
                },
                {
                    text: 'Cerrar',
                    id: prototype.idSA + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]
});
