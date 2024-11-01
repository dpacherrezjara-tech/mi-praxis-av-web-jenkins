prototype.idDE = prototype.id + '-ReverseAccountingDataEntry';

Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ReverseAccountingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ReverseAccountingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingDataEntryController'
    ],
    controller: 'ReverseAccountingDataEntryController',
    title: 'Reverse Accounting - Form',
    header: true,
    width: 1150,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: true
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Parameters">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Client',
                                    name: 'IN_CCUST',
                                    id: prototype.idDE + '-cmbCcust',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['134', 'AV - AVIANCA'],
                                            ['202', 'TA - TACA'],
                                            ['547', '2K - AEROGAL'],
                                            ['133', 'LR - LACSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '134'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbCODPRO',
                                    name: 'IN_CODPRO',
                                    labelWidth: 80,
                                    width: 250,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '', // Valor inicial (vacío)
                                    emptyText: '(All)'  // Texto que se muestra cuando no hay selección
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_VALDATE',
                                    fieldLabel: 'Value date',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 75,
                                    width: 165,
                                    value: new Date(),
                                    listeners: {
                                        'specialkey': 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bandoc',
                                    labelWidth: 60,
                                    width: 190,
                                    name: 'IN_BANDOC',
                                    minLength: 8,
                                    maxLength: 10, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Reference',
                                    labelWidth: 80,
                                    width: 230,
                                    name: 'IN_REFER',
                                    minLength: 15,
                                    maxLength: 20, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search Bandoc',
                                    listeners: {
                                        click: 'onSearchBandoc'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        },
        {
            xtype: 'grid',
            hidden: true,
            id: prototype.idDE + '-scanBandoc',
            maxHeight: 800,
            //minHeight: 200,
            height: 'auto',
            width: '100%',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            selModel: {
                type: 'checkboxmodel',
                mode: 'MULTI'
            },
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'RN',
                        locked: true,
                        xtype: 'rownumberer', // Columna de número de fila
                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                    },
                    {text: 'Client<br>Code', dataIndex: 'A4545CCUST', width: 50},
                    {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1},
                    {text: 'Bandoc', dataIndex: 'A4545DOCBA', width: 180},
                    {text: 'Value<br>Date', dataIndex: 'A4545DOCD', width: 80},
                    {text: 'Accounting ID', dataIndex: 'A4545USER', width: 230}
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Process',
                    id: prototype.idDE + '-btn-process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onSearchBandoc'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});