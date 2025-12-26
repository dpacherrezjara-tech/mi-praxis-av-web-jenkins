prototype.idDEsequence = prototype.id + '-SequencesDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.SequencesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.SequencesDataEntry',
    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.field.*',
        'Ext.Praxis.controller.payments.HeadersReport.SequencesDataEntryController'
    ],
    controller: 'SequencesDataEntryController',
    title: 'Sequences Maintenance - Form',
    header: true,
    width: 1400,
    minWidth: 950,
    height: 700,
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
            id: prototype.idDEsequence + '-mainFormSequences',
            layout: {
                type: 'vbox',
                pack: 'stretch'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'start'
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

                //<editor-fold defaultstate="collapsed" desc="File Details">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">File Details</span>',
                    itemId: prototype.idDEsequence + '-fileDetails',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 100,
                            margin: '2 10 2 10',
                            labelStyle: 'text-align:left;font-weight:bolder;line-height:22px;',
                            fieldStyle: 'text-align:center;border-style:solid;border-color:#6CB6E7;border-width:1px;background:white;',
                            flex: 1,
                            readOnly: true
                        }
                    },
                    items: [
                        {
                            items: [
                                { fieldLabel: 'Header ID', name: 'CORRLAV', itemId: 'CORRLAV' },
                                { fieldLabel: 'Praxis ID', name: 'IDCONT', itemId: 'IDCONT' },
                                { fieldLabel: 'File Name', name: 'FILENAM', itemId: 'FILENAM' }
                            ]
                        },
                        {
                            items: [
                                { fieldLabel: 'Type', name: 'TYPE', itemId: 'TYPE' },
                                { fieldLabel: 'Status Praxis', name: 'STATUS_PRAXIS', itemId: 'STATUS_PRAXIS' },
                                { fieldLabel: 'Status SAP', name: 'STATUS_SAP', itemId: 'STATUS_SAP' },
                                { fieldLabel: 'Acc. Period', name: 'FCONT', itemId: 'FCONT' },
                                { fieldLabel: 'Hour Sended', name: 'HSEND', itemId: 'HSEND' }
                            ]
                        },
                        {
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    fieldLabel: 'Qty. Sequence', name: 'TOT_SECUENCIAS', itemId: 'TOT_SECUENCIAS',
                                    width: 180, labelWidth: 100, flex: 0
                                },
                                {
                                    fieldLabel: 'Rej. Sequence', name: 'REJ_SECUENCIAS', itemId: 'REJ_SECUENCIAS',
                                    width: 180, labelWidth: 100, flex: 0
                                }
                            ]
                        }
                    ]
                },

                //</editor-fold> 

                //<editor-fold defaultstate="collapsed" desc="Grids">
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
                            xtype: 'tabpanel',
                            id: prototype.idDEsequence + '-tabMainSequences2',
                            width: '100%',
                            flex: 1,
                            height: '100%',
                            border: false,
                            margin: '0 1 0 1',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                //margin: '0 5 0 5',
                                height: '100%',
                                autoScroll: false,
                                layout: 'fit',
                                defaults: {
                                    width: '100%',
                                    minHeight: 389,
                                    maxHeight: 390,
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
                                //<editor-fold defaultstate="collapsed" desc="Sequences">
                                {
                                    title: 'Sequences',
                                    itemId: 'A',
                                    id: prototype.idDEsequence + '-tabSequences',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDEsequence + '-gridSequences',
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
                                                            change: 'onFilterReference'
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
                                                            change: 'onFilterBandoc'
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
                                            store: {
                                                fields: [
                                                    'BANDOC',
                                                    'REFER',
                                                    'VALDATE',
                                                    'MONEDA_PAGO',
                                                    'MONTO_PAGO',
                                                    'MONEDA_REVENUE',
                                                    'MONTO_REVENUE'
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
                                                    { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 120 },
                                                    { text: 'Referencia', dataIndex: 'REFER', flex: 1 },
                                                    { text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80 },
                                                    { text: 'Curr.', dataIndex: 'MONEDA_PAGO', width: 60 },
                                                    {
                                                        text: 'Amount', dataIndex: 'MONTO_PAGO', width: 160,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }

                                                    },
                                                    {
                                                        text: 'Rev.<br>Currency', dataIndex: 'MONEDA_REVENUE', width: 160
                                                    },
                                                    {
                                                        text: 'Rev.<br>Amount', dataIndex: 'MONTO_REVENUE', width: 160,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#dcdf3a;text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        id: prototype.idDEsequence + '-btnRejectRec',
                                                        width: 50,
                                                        text: 'Rej.',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Reject Sequence',
                                                                handler: 'onRejectRec'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }


                                        },
                                    ]
                                },
                                //</editor-fold>   

                                //<editor-fold defaultstate="collapsed" desc="Rejections">
                                {
                                    title: 'Rejections',
                                    itemId: 'C',
                                    disabled: true,
                                    id: prototype.idDEsequence + '-tabRejections',
                                    layout: 'fit',
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
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer', // Columna de número de fila
                                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'STREJ', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;";
                                                            const opts = {
                                                                'R': 'Rejected'
                                                            };
                                                            return opts[value];
                                                        }
                                                    },
                                                    { text: 'Reference', dataIndex: 'REFER', width: 150 },
                                                    { text: 'Bank Doc.', dataIndex: 'BANDOC', width: 90 },
                                                    { text: 'Value<br>Date', dataIndex: 'VALDATE', width: 80 },
                                                    { text: 'Processor', dataIndex: 'CODPRO', width: 80 },
                                                    { text: 'Code', dataIndex: 'CODREC', width: 70 },
                                                    { text: 'Comment', dataIndex: 'OBSERV', flex: 1 }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>  

                                //<editor-fold defaultstate="collapsed" desc="Derived headers">
                                {
                                    title: 'Reprocessing Summary',
                                    itemId: 'B',
                                    disabled: true,
                                    id: prototype.idDEsequence + '-tabDerived',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDEsequence + '-gridDerived',
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
                                                        editable: false,
                                                        fieldLabel: 'Original State',
                                                        labelWidth: 100,
                                                        width: 500,
                                                        maxLength: 30,
                                                        name: 'STATUS_ORG',
                                                        value: 'LOADED', // valor por defecto o dinámico
                                                        fieldStyle: 'text-align:center;background-color:#43bf68;color:#fff;font-weight:bold;',
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
                                                        text: 'Process Origin', dataIndex: 'R_SOURCE', flex: 1,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //metaData.style = "background-color:#838187";
                                                            const opts = {
                                                                'AUTO_SUCCESS': () => {
                                                                    metaData.style = "background-color:#43bf68;color:#ffffff;font-weight:bold"; // Verde
                                                                    return 'Auto Process';
                                                                },
                                                                'MANUAL_REJECT': () => {
                                                                    metaData.style = "background-color:#f5a623;color:#000000;font-weight:bold"; // Naranja
                                                                    return 'Manual Reprocess';
                                                                }
                                                            };

                                                            return opts[value]();
                                                        }
                                                    },
                                                    { text: 'Qty. Sequence', dataIndex: 'QTY_SEQUENCES', flex: 0.5 },
                                                    { text: 'New Header ID', dataIndex: 'NEW_HEADER_ID', flex: 1 },
                                                    {
                                                        text: 'New File Name', dataIndex: 'NEW_FILENAME', flex: 1,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            let filename = value;
                                                            if (!value) {
                                                                filename = 'Pending File';
                                                                metaData.style = "background-color:#d4d4d4;color:000";
                                                            }
                                                            return filename;
                                                        }
                                                    },
                                                    { text: 'New Praxis ID', dataIndex: 'NEW_PRAXIS_ID', flex: 1 },
                                                    {
                                                        text: 'Description', dataIndex: 'R_SOURCE', flex: 2,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            //metaData.style = "background-color:#838187";
                                                            const opts = {
                                                                'AUTO_SUCCESS': () => {
                                                                    return 'Generated automatically from successful sequences';
                                                                },
                                                                'MANUAL_REJECT': () => {
                                                                    return 'Generated manually from previously rejected sequences';
                                                                }
                                                            };

                                                            return opts[value]();
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                //</editor-fold>  



                            ]
                        }
                    ]
                },
                //</editor-fold>        
            ]
        }
    ],
    dockedItems: [
        //<editor-fold defaultstate="collapsed" desc="Buttons Footer"> 
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
                    text: 'Save',
                    id: prototype.idDEsequence + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onSaveRecord'
                    }
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
        },
        //</editor-fold> 

        //<editor-fold defaultstate="collapsed" desc="Control Data">
        {
            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">User Control Data</span>',
            itemId: prototype.idDEsequence + '-userDetails',
            dock: 'bottom',
            //margin: '0 0 5 0',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'end'
            },
            flex: 1,
            defaults: {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    pack: 'end'
                },
                flex: 1,
                border: false,
                bodyStyle: 'background: #E0F2F7',
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 90,
                    margin: '2 10 2 10',
                    labelStyle: 'text-align:left;font-weight:bolder;line-height:22px;',
                    width: 300
                }
            },
            items: [
                {
                    items: [
                        { fieldLabel: 'User Created', name: 'USCR', itemId: 'USCR' },
                        { fieldLabel: 'Date Created', name: 'TSCR', itemId: 'TSCR' },
                        { fieldLabel: 'User Updated', name: 'USUP', itemId: 'USUP' },
                        { fieldLabel: 'Date Updated', name: 'TSUP', itemId: 'TSUP' }
                    ]
                }
            ]
        }
        //</editor-fold> 
    ]
});