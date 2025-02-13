prototype.idDE = prototype.id + '-HeaderDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.HeaderDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.HeaderDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.HeaderDataEntryController'
    ],
    controller: 'HeaderDataEntryController',
    title: 'Header Maintenance - Form',
    header: true,
    width: 800,
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
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Details</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Acc. Type',
                                    id: prototype.idDE + '-cmbTIPOCON',
                                    name: 'TIPOCON',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debits'],
                                            ['ADJ', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 90,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true,
                                    value: ''
                                },
                                {
                                    name: 'PRDAF',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'Processed From',
                                    labelWidth: 120,
                                    width: 210
                                },
                                {
                                    name: 'PRDAT',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'To',
                                    labelWidth: 40,
                                    width: 130
                                }

                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'IDCONT',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'Praxis ID',
                                    labelWidth: 90,
                                    width: 280
                                },
                                {
                                    name: 'FCONT',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'Acc. Date',
                                    labelWidth: 80,
                                    width: 180
                                },
                                {
                                    name: 'CODPRO',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'Processor',
                                    labelWidth: 80,
                                    width: 180
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'FILENAM',
                                    editable: false, // Deshabilita la edición del campo
                                    fieldLabel: 'Header ID',
                                    labelWidth: 90,
                                    width: 280
                                },
                                {
                                    xtype: 'combobox',
                                    labelStyle: 'font-weight:bold;',
                                    fieldLabel: 'Status',
                                    name: 'STCONT',
                                    fieldStyle: 'text-align:center;font-weight:bold;',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Loaded'],
                                            ['5', 'Sended to AV'],
                                            ['6', 'Partially Loaded']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Grid Files">
                {
                    xtype: 'panel',
                    border: false,
                    width: '100%',
                    margin: '3 3 3 3',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'grid',
                            titleAlign: 'center',
                            minHeight: 100,
                            maxHeight: 140,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            title: 'Files',
                            id: prototype.idDE + '-gridFiles',
                            width: '100%',
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
                                    {text: 'File Name', dataIndex: 'FILENAM', flex: 1},
                                    {text: 'Date', dataIndex: 'FSEND', width: 100},
                                    {text: 'Hour', dataIndex: 'HSEND', width: 80}
                                ]
                            }
                        },
                        {
                            xtype: 'tabpanel',
                            id: prototype.idDE + '-tabMain',
                            width: '100%',
                            height: 'auto',
                            border: false,
                            margin: '0 1 0 1',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                //margin: '0 5 0 5',
                                height: 'auto',
                                autoScroll: false,
                                layout: 'fit',
                                defaults: {
                                    width: '100%',
                                    minHeight: 100,
                                    maxHeight: 155,
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
                                    title: 'Accounted',
                                    itemId: 'A',
                                    id: prototype.idDE + '-tabAccounted',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridAccounted',
                                            emptyText: 'No documents available',
                                            tbar: {
                                                xtype: 'panel',
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
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                displayInfo: true,
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'refresh',
                                                        hidden: true // Oculta el botón de refresh
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
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        hidden: true,
                                                        text: 'Info',
                                                        locked: true,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-detail',
                                                                tooltip: 'Open Detail',
                                                                handler: 'onLoadAccountingInfo'
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Reference', dataIndex: 'REFER', flex: 1},
                                                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 150},
                                                    {text: 'Value Date', dataIndex: 'VALDATE', width: 120},
                                                    {text: 'Processor', dataIndex: 'CODPRO', width: 80},
                                                    {text: 'Type', dataIndex: 'STCON', width: 70,
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
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        id: prototype.idDE + '-btnRejectRec',
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
                                            }
                                        }
                                    ]
                                },
                                {
                                    title: 'Rejected',
                                    itemId: 'R',
                                    id: prototype.idDE + '-tabRejected',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridRejected',
                                            emptyText: 'No documents available',
                                            bbar: {
                                                xtype: 'pagingtoolbar',
                                                displayInfo: true,
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'refresh',
                                                        hidden: true // Oculta el botón de refresh
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
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        hidden: true,
                                                        width: 40,
                                                        text: 'Info',
                                                        locked: true,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-detail',
                                                                tooltip: 'Open Detail',
                                                                handler: 'onLoadRejectedsInfo'
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Reference', dataIndex: 'REFER', width: 160},
                                                    {text: 'Bank Doc.', dataIndex: 'BANDOC', width: 150},
                                                    {text: 'Value Date', dataIndex: 'VALDATE', width: 120},
                                                    {text: 'Qty SEQ', dataIndex: 'SEQNBR', width: 80},
                                                    {text: 'Processor', dataIndex: 'CODPRO', width: 150},
                                                    {text: 'Type', dataIndex: 'MODO', width: 70,
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
                                                    {text: 'Rejection Error', dataIndex: 'DESCR', width: 320}
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="Control Data">
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
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 0 5 0'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onSaveRecord'
                    }
                },
                {
                    text: 'Reject',
                    id: prototype.idDE + '-btn-rejectAll',
                    iconCls: 'prx-icon-incomplete',
                    listeners: {
                        click: 'onRejectAll'
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