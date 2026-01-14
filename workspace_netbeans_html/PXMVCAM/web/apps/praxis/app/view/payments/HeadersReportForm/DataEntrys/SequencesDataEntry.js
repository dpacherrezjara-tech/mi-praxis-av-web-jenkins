prototype.idDEsequence = prototype.id + '-SequencesDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.SequencesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.SequencesDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.SequencesDataEntryController'
    ],
    controller: 'SequencesDataEntryController',
    title: 'Sequences Maintenance - Form',
    header: true,
    width: 1000,
    minHeight: 390,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDEsequence + '-interfaceForm',
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
                        fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Information</span>',
                    items: [
                        {
                            items: [
                                /*
                                {
                                    fieldLabel: 'Type',
                                    name: 'TIPOCON',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'REG': 'Regular',
                                                'DEB': 'Debit',
                                                'ADJ': 'Adjustments',
                                                'ADM': 'ADMs'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Sub-Type',
                                    name: 'MODO',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'P': 'PAX COL',
                                                'A': 'COR COL',
                                                'C': 'CGO COL',
                                                'E': 'PAX EXT',
                                                'G': 'CGO EXT',
                                                'D': 'DEB COL',
                                                'B': 'DEB EXT',
                                                'J': 'ADJ COL',
                                                'K': 'ADJ EXT',
                                                'H': 'PAX CASH',
                                                'M': 'ADM'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                */
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Type',
                                    name: 'TIPOCON',
                                    labelWidth: 70,
                                    width: 170,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debit'],
                                            ['ADJ', 'Adjustments'],
                                            ['ADM', 'ADMs']
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
                                            if (valor === 'REG') {
                                                combo.setFieldStyle('background:#27F55E;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === 'DEB') {
                                                combo.setFieldStyle('background:#DE8849;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === 'ADJ') {
                                                combo.setFieldStyle('background:#4980DE;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else {
                                                combo.setFieldStyle('background:#D991CE;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Sub-Type',
                                    name: 'MODO',
                                    labelWidth: 70,
                                    width: 170,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['P', 'PAX COL'],
                                            ['A', 'COR COL'],
                                            ['C', 'CGO COL'],
                                            ['E', 'PAX EXT'],
                                            ['G', 'CGO EXT'],
                                            ['D', 'DEB COL'],
                                            ['B', 'DEB EXT'],
                                            ['J', 'ADJ COL'],
                                            ['K', 'ADJ EXT'],
                                            ['H', 'PAX CASH'],
                                            ['M', 'ADM']
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

                                            combo.setFieldStyle('background:#F5ED89;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Client',
                                    name: 'CCUST',
                                    labelWidth: 70,
                                    width: 170
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'CODPRO',
                                    labelWidth: 70,
                                    width: 170,
                                    value: 'None'
                                },
                                /*
                                {
                                    fieldLabel: 'Status',
                                    name: 'STSAP',
                                    labelWidth: 70,
                                    width: 170,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'SFTP',
                                                '2': 'Loaded',
                                                '3': 'Rejected',
                                                '4': 'Partial Rejected',
                                                '5': 'Partial Loaded'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },*/
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'STSAP',
                                    labelWidth: 70,
                                    width: 190,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'SFTP'],
                                            ['2', 'Loaded'],
                                            ['3', 'Rejected'],
                                            ['4', 'Partial Rejected'],
                                            ['5', 'Partial Loaded'],
                                            ['6', 'Reverse Loaded']
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
                                            if (valor === '1') {
                                                combo.setFieldStyle('background:#2d8cf0;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === '2') {
                                                combo.setFieldStyle('background:#43bf68;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === '3') {
                                                combo.setFieldStyle('background:#de5959;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === '4') {
                                                combo.setFieldStyle('background:#fcda2d;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else if (valor === '5') {
                                                combo.setFieldStyle('background:#f5a623;text-align:center;font-weight: bold;color:#000000;border-radius: 15px;');
                                            } else{
                                                combo.setFieldStyle('background:#de5959;text-align:center;font-weight: bold;color:#ffffff;border-radius: 15px;');
                                            }
                                                
                                        }
                                    }
                                },

                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Praxis ID',
                                    name: 'IDCONT',
                                    labelWidth: 70,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Period',
                                    name: 'FCONT',
                                    labelWidth: 60,
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Date Send',
                                    name: 'FSEND',
                                    labelWidth: 70,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Hour Send',
                                    name: 'HSEND',
                                    labelWidth: 70,
                                    width: 150
                                },


                            ]
                        },
                        {
                            items: [

                                {
                                    fieldLabel: 'File Name',
                                    name: 'FILENAM',
                                    labelWidth: 70,
                                    width: 330
                                },
                                {
                                    fieldLabel: 'Header',
                                    name: 'CORRLAV',
                                    labelWidth: 70,
                                    width: 250
                                },
                                {
                                    fieldLabel: 'Active Seq',
                                    name: 'TOT_SECUENCIAS',
                                    labelWidth: 70,
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Reject Seq',
                                    name: 'REJ_SECUENCIAS',
                                    labelWidth: 70,
                                    width: 130
                                },


                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Details</span>',
                    defaults: {},
                    style: {
                        backgroundColor: '#9ebbd3ff' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            margin: '2 2 2 2',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: prototype.idDEsequence + '-tabMain',
                                    width: '100%',
                                    height: 'auto',
                                    border: false,
                                    margin: '0 1 0 1',
                                    bodyStyle: 'background: transparent',
                                    defaults: {
                                        height: 'auto',
                                        autoScroll: false,
                                        layout: 'fit',
                                        defaults: {
                                            width: '100%',
                                            minHeight: 100,
                                            maxHeight: 300,
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            height: 'auto'
                                        }
                                    },
                                    items: [
                                        {
                                            title: 'Sequences',
                                            itemId: '1',
                                            id: prototype.idDEsequence + '-tabSequences',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    border: false,
                                                    id: prototype.idDEsequence + '-gridSequences',
                                                    emptyText: 'No documents available',
                                                    tbar: {
                                                        xtype: 'panel',
                                                        id: prototype.idDEsequence + '-boxSequences',
                                                        layout: {
                                                            type: 'hbox',
                                                            pack: 'end'
                                                        },
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '2 5 2 5',
                                                                labelStyle: 'text-align:left;font-weight: bolder;',
                                                                fieldStyle: 'text-align:center;',
                                                                editable: true,
                                                                fieldLabel: 'Reference',
                                                                labelWidth: 70,
                                                                width: 200,
                                                                maxLength: 30,
                                                                listeners: {
                                                                    change: 'onChangeReference'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                margin: '2 5 2 5',
                                                                labelStyle: 'text-align:left;font-weight: bolder;',
                                                                fieldStyle: 'text-align:center;',
                                                                editable: true,
                                                                fieldLabel: 'Bank Doc.',
                                                                labelWidth: 80,
                                                                width: 190,
                                                                maxLength: 10,
                                                                listeners: {
                                                                    change: 'onChangeBandoc'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                margin: '2 5 2 5',
                                                                scale: 'small',
                                                                text: 'Reject XLSX',
                                                                id: prototype.idDEsequence + '-btn-rej-excel',
                                                                iconCls: 'prx-icon-excel',
                                                                listeners: {
                                                                    click: 'onRejectByExcel'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                margin: '2 5 2 5',
                                                                scale: 'small',
                                                                text: 'Reject All',
                                                                id: prototype.idDEsequence + '-btn-rejectAll',
                                                                iconCls: 'prx-icon-incomplete',
                                                                listeners: {
                                                                    click: 'onRejectAll'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    columns: {
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        items: [
                                                            { text: 'Processor', dataIndex: 'CODPRO', width: 80 },
                                                            { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120 },
                                                            { text: 'Values<br>Date', dataIndex: 'VALDATE', width: 100 },
                                                            { text: 'Reference', dataIndex: 'REFER', flex: 1 },
                                                            {
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                id: prototype.idDEsequence + '-btnRejectRec',
                                                                width: 50,
                                                                text: 'Rej.',
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-image-trash',
                                                                        tooltip: 'Reject',
                                                                        handler: 'onRejectRec'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        displayInfo: true
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Rejections',
                                            itemId: '2',
                                            id: prototype.idDEsequence + '-tabRejections',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    border: false,
                                                    id: prototype.idDEsequence + '-gridRejections',
                                                    emptyText: 'No documents available',
                                                    columns: {
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        items: [
                                                            { text: 'Processor', dataIndex: 'CODPRO', width: 80 },
                                                            { text: 'Reference', dataIndex: 'REFER', width: 130 },
                                                            { text: 'Code', dataIndex: 'CODREC', width: 100 },
                                                            { text: 'Comment', dataIndex: 'OBSERV', flex: 1 },
                                                            {
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                id: prototype.idDEsequence + '-btnCancelRec',
                                                                width: 60,
                                                                text: 'Cancel',
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-image-trash',
                                                                        tooltip: 'Cancel Rejection',
                                                                        handler: 'onCancelRejectRec'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    bbar: {
                                                        xtype: 'pagingtoolbar',
                                                        displayInfo: true
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">New File Information</span>',
                    defaults: {},
                    id: prototype.idDEsequence + '-newFileBox',
                    hidden: true,
                    style: {
                        backgroundColor: '#f0f18aff' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            margin: '2 2 2 2',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    width: '100%',
                                    border: false,
                                    id: prototype.idDEsequence + '-newFileGrid',
                                    emptyText: 'No documents available',
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            { text: 'New Header', dataIndex: 'HEADER', width: 150 },
                                            { text: 'New File Name', dataIndex: 'FILENAM', flex: 1 },
                                            {
                                                text: 'Origin', dataIndex: 'STCAR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    const opts = {
                                                        'I': 'Integrator SAP',
                                                        'W': 'Web Manual'
                                                    };
                                                    return opts[value] || 'Other';
                                                }

                                            },
                                            {
                                                text: 'Status', dataIndex: 'STPRO', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    const opts = {
                                                        'S': 'SFTP',
                                                        'P': 'Pending Send'
                                                    };
                                                    return opts[value] || 'Error';
                                                }

                                            }
                                        ]
                                    }
                                }
                            ]
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
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Reverse',
                    hidden:true,
                    id: prototype.idDEsequence + '-btn-rejsuc',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onRejectSuccess'
                    }
                },
                {
                    text: 'Save',
                    id: prototype.idDEsequence + '-btn-save',
                    iconCls: 'prx-icon-complete',
                    listeners: {
                        click: 'onSaveFile'
                    }
                },
                {
                    text: 'Reject',
                    id: prototype.idDEsequence + '-btn-reject',
                    iconCls: 'prx-icon-incomplete',
                    listeners: {
                        click: 'onRejectFile'
                    }
                },
                {
                    xtype: 'checkbox',
                    id: prototype.idDEsequence + '-chk-reject',
                    hidden: true,
                    boxLabel: 'Without new File',
                    checked: false
                },
                {
                    text: 'Cancel',
                    id: prototype.idDEsequence + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});