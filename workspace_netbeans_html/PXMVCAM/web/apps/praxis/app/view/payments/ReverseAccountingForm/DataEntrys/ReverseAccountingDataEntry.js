prototype.idDE = prototype.id + '-ReverseAccountingDataEntry';

Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ReverseAccountingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ReverseAccountingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingDataEntryController'
    ],
    controller: 'ReverseAccountingDataEntryController',
    title: 'BPO Rejection Maintenance - Form',
    header: true,
    width: 1300,
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
                        margin: '3 7 3 7',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Parameters">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Rejection Details</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Praxis ID',
                                    labelWidth: 90,
                                    width: 260,
                                    name: 'IDCONT'
                                },
                                {
                                    fieldLabel: 'Header',
                                    labelWidth: 60,
                                    width: 200,
                                    name: 'HEADER'
                                },
                                {
                                    fieldLabel: 'Reference',
                                    labelWidth: 80,
                                    width: 230,
                                    name: 'REFER'
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Type Rejection',
                                    id: prototype.id + '-STREJ',
                                    name: 'STREJ',
                                    labelWidth: 100,
                                    width: 190,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['R', 'Rejected'],
                                            ['J', 'Justified'],
                                            ['P', 'Re-Process']
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    border: false,
                                    value: '',
                                    listeners: {
                                        change: function (combo, record, eOpts) {
                                            var valor = combo.getValue();
                                            combo.inputWrap.setStyle({
                                                border: 'none',
                                                boxShadow: 'none',
                                                background: 'transparent'
                                            });
                                            // Reset estilo base primero
                                            combo.setFieldStyle('');

                                            // Aplica color dinámicamente según valor
                                            if (valor === 'R') {
                                                combo.setFieldStyle('background:#d26666;text-align:center;font-weight: bolder;color:#ffffff;border-radius: 15px;');
                                            } else if (valor === 'J') {
                                                combo.setFieldStyle('background:#e5e368;text-align:center;font-weight: bold;border-radius: 15px;');
                                            } else if (valor === 'P') {
                                                combo.setFieldStyle('background:#1379c8;text-align:center;font-weight: bold;color:#ffffff;border-radius: 15px;');
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'SAP Status',
                                    name: 'STSAP',
                                    labelWidth: 80,
                                    width: 170,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['P', 'Pending'],
                                            ['L', 'Loaded']
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    border: false,
                                    value: '',
                                    listeners: {
                                        change: function (combo, record, eOpts) {
                                            var valor = combo.getValue();
                                            combo.inputWrap.setStyle({
                                                border: 'none',
                                                boxShadow: 'none',
                                                background: 'transparent'
                                            });
                                            
                                            // Reset estilo base primero
                                            combo.setFieldStyle('');

                                            // Aplica color dinámicamente según valor
                                            if (valor === 'L') {
                                                combo.setFieldStyle('background:#1379c8;text-align:center;font-weight: bolder;color:#ffffff;border-radius: 15px;');
                                            } else if (valor === 'P') {
                                                combo.setFieldStyle('background:#e5c070;text-align:center;font-weight: bolder;color:#ffffff;border-radius: 15px;');
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Error Code',
                                    labelWidth: 90,
                                    width: 180,
                                    name: 'CODREC'
                                },
                                {
                                    fieldLabel: 'AV Comment',
                                    labelWidth: 100,
                                    width: 800,
                                    name: 'OBSERV',
                                    fieldStyle:'text-align:left;'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    labelWidth: 90,
                                    width: 180,
                                    fieldLabel: 'BPO Status',
                                    name: 'STREVI',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['Y', 'Audited'],
                                            ['N', 'Pending']
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    border: false,
                                    value: '',
                                    listeners: {
                                        change: function (combo, record, eOpts) {
                                            var valor = combo.getValue();
                                            combo.inputWrap.setStyle({
                                                border: 'none',
                                                boxShadow: 'none',
                                                background: 'transparent'
                                            });
                                            
                                            // Reset estilo base primero
                                            combo.setFieldStyle('');

                                            // Aplica color dinámicamente según valor
                                            if (valor === 'N') {
                                                combo.setFieldStyle('background:#e5c070;text-align:center;font-weight: bolder;color:#ffffff;border-radius: 15px;');
                                            } else if (valor === 'Y') {
                                                combo.setFieldStyle('background:#1379c8;text-align:center;font-weight: bold;color:#ffffff;border-radius: 15px;');
                                            }
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'BPO Comment',
                                    labelWidth: 100,
                                    width: 800,
                                    id: prototype.idDE+ '-txtBpoComment',
                                    name: 'BPOCOMM',
                                    editable: true,
                                    maxLenght: 100,
                                    enforceMaxLenght: true,
                                    fieldStyle:'text-align:left;'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    defaults: {},
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDE + '-accountingGrid',
                            maxHeight: 600,
                            //minHeight: 200,
                            height: 'auto',
                            width: '100%',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
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
                                    {text: 'Society', dataIndex: 'A4545COMPC', width: 80},
                                    {text: 'Processor', dataIndex: 'A4545COREP', width: 80},
                                    {text: 'Bank Doc.', dataIndex: 'A4545DOCBA', width: 100},
                                    {text: 'Value<br>Date', dataIndex: 'A4545DOCD', width: 100},
                                    {text: 'Reference', dataIndex: 'A4545REFD', width: 160},
                                    {text: 'Record<br>Type', dataIndex: 'A4545HREGI', width: 80},
                                    {text: 'Record<br>Description', dataIndex: 'A4545FREGI', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#bbe3ac;color:#65242e;font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    {text: 'SEQ', dataIndex: 'A4545SEQ', width: 60},
                                    {text: 'Item', dataIndex: 'A4545ITEM', width: 60},
                                    {text: 'Profit', dataIndex: 'A4545PROFI', width: 120},
                                    {text: 'Cost Center', dataIndex: 'A4545CCOST', width: 100},
                                    {text: 'Customer', dataIndex: 'A4545CUSTO', width: 100},
                                    {text: 'Primary<br>Key', dataIndex: 'A4545PKEY', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            const opts = {
                                                '15': () => {
                                                    metaData.style = "color:#2fc611;font-weight:bold;";
                                                },
                                                '50': () => {
                                                    metaData.style = "color:#2fc611;font-weight:bold;";
                                                },
                                                '40': () => {
                                                    metaData.style = "color:#c61111;font-weight:bold;";
                                                },
                                                '01': () => {
                                                    metaData.style = "color:#c61111;font-weight:bold;";
                                                }
                                            };
                                            opts[value]();
                                            return value;
                                        }
                                    },
                                    {text: 'Account', dataIndex: 'A4545CUENT', width: 100},
                                    {text: 'Currency', dataIndex: 'A4545CUR', width: 80},
                                    {text: 'Value', dataIndex: 'A4545ACTIV', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Balance', dataIndex: 'A4545PASIV', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Large Text', dataIndex: 'A4545TEXTD', width: 400},
                                    {text: 'Bussiness<br>Place', dataIndex: 'A4545PLACE', width: 80},
                                    {text: 'Bank<br>Code', dataIndex: 'A4545BANCO', width: 70},
                                    {text: 'Bank Name', dataIndex: 'A4545REFB', width: 180},
                                    {text: 'Country', dataIndex: 'A4545PAIS', width: 70},
                                    {text: 'Key 1', dataIndex: 'A4545REFK', width: 120},
                                    {text: 'Key 2', dataIndex: 'A4545REFK2', width: 120},
                                    {text: 'Payment', dataIndex: 'A4545MPAGO', width: 70},
                                    {text: 'Acc. Number', dataIndex: 'A4545ANUMB', width: 160},
                                    {text: 'Pay Reference', dataIndex: 'A4545REPAG', width: 170},
                                    {text: 'Sub-Type', dataIndex: 'A4545MODO', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //metaData.style = "background-color:#838187";
                                            const opts = {
                                                'P': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'PAX CO';
                                                },
                                                'A': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'CGO CO';
                                                },
                                                'C': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'COR CO';
                                                },
                                                'E': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'PAX EXT';
                                                },
                                                'G': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'CGO EXT';
                                                },
                                                'T': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'TAX EXT';
                                                },
                                                'D': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'DEB CO';
                                                },
                                                'B': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'DEB EXT';
                                                },
                                                'J': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'ADJ CO';
                                                },
                                                'K': () => {
                                                    metaData.style = "font-weight:bold";
                                                    return 'ADJ EXT';
                                                }
                                            };
                                            return opts[value] ? opts[value]() : '';
                                        }
                                    },
                                    {text: 'Merchant', dataIndex: 'A4545MERCH', width: 120},
                                    {text: 'Agent', dataIndex: 'A4545AGENT', width: 90},
                                    {text: 'A. Date', dataIndex: 'A4545ADATE', width: 100},
                                    {text: 'Date Bank', dataIndex: 'A4545DATCI', width: 100},
                                    {text: 'Trans. Bank', dataIndex: 'A4545TRACI', width: 100},
                                    {text: 'Date Settl', dataIndex: 'A4545DATEC', width: 100},
                                    {text: 'Trans. Settl', dataIndex: 'A4545TRANC', width: 100},
                                    {text: 'Accounting<br>Date', dataIndex: 'A4545PSTGD', width: 100},
                                    {text: 'Accounting<br>ID', dataIndex: 'A4545USER', width: 200}
                                ]
                            }
                        }
                    ]
                },

                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    width: '100%',
                    style: {
                        backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 200,
                                    fieldLabel: 'Date Crt.',
                                    name: 'TSCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 200,
                                    fieldLabel: 'Date Upd.',
                                    name: 'TSUP'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onUpdateRejection'
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