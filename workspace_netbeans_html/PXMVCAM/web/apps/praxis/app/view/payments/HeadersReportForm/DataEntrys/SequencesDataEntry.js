prototype.idDEheader = prototype.id + '-SequencesDataEntry';

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
            id: prototype.idDEheader + '-mainForm',
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
                    itemId: prototype.idDEheader + '-fileDetails',
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
                            xtype: 'displayfield',
                            labelWidth: 100,
                            margin: '2 10 2 10',
                            labelStyle: 'text-align:left;font-weight:bolder;line-height:22px;',
                            flex: 1
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
                                { fieldLabel: 'Date Send', name: 'HSEND', itemId: 'HSEND' }
                            ]
                        },
                        {
                            items: [   
                                { fieldLabel: 'Qty. Sequence', name: 'TOT_SECUENCIAS', itemId: 'TOT_SECUENCIAS' },
                                { fieldLabel: 'Rej. Sequence', name: 'REJ_SECUENCIAS', itemId: 'REJ_SECUENCIAS' },
                                { fieldLabel: 'Pay. Currency', name: 'PAY_CURRENCY', itemId: 'PAY_CURRENCY' },
                                { fieldLabel: 'Pay. Amount', name: 'PAY_AMOUNT', itemId: 'PAY_AMOUNT' },
                                { fieldLabel: 'Rev. Currency', name: 'REV_CURRENCY', itemId: 'REV_CURRENCY' },
                                { fieldLabel: 'Rev. Amount', name: 'REV_AMOUNT', itemId: 'REV_AMOUNT' }
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
                            xtype: 'tabpanel',
                            id: prototype.idDEheader + '-tabMain2',
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
                                    minHeight: 100,
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
                                    id: prototype.idDEheader + '-tabAccounted',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDEheader + '-gridAccounted',
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
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        margin: '2 5 2 5',
                                                        scale: 'small',
                                                        text: 'Reject XLSX',
                                                        id: prototype.idDEheader + '-btn-rej-excel',
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
                                                        id: prototype.idDEheader + '-btn-rejectAll',
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
                                                    {text: 'Bank Doc.', dataIndex: 'BANKDOC', flex: 1},
                                                    {text: 'Value Date', dataIndex: 'VALUE_DATE', flex: 1},
                                                    {text: 'Affiliate', dataIndex: 'AFILIADO', flex: 1},
                                                    {text: 'IATA', dataIndex: 'IATA', flex: 1},
                                                    {text: 'Profit', dataIndex: 'PROFIT_CENTER', flex: 1},
                                                    {text: 'Cost Center', dataIndex: 'CENTRO_COSTO', flex: 1},
                                                    {text: 'Pay. Currency', dataIndex: 'MONEDA_PAGO', flex: 0.8},
                                                    {text: 'Pay. Amount', dataIndex: 'MONTO_PAGO', flex: 0.8},
                                                    {text: 'Rev. Currency', dataIndex: 'MONEDA_REVENUE', flex: 0.8},
                                                    {text: 'Rev. Amount', dataIndex: 'MONTO_REVENUE', flex: 0.8},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        id: prototype.idDEheader + '-btnRejectRec',
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
                               //</editor-fold>   
                     
                               //<editor-fold defaultstate="collapsed" desc="Derived headers">
                                {
                                    title: 'Derived headers',
                                    itemId: 'B',
                                    disabled: true,
                                    id: prototype.idDEheader + '-tabDerived',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDEheader + '-gridDerived',
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
                                                    {text: 'Derived From', dataIndex: 'DERIVED_FROM', flex: 0.7},
                                                    {text: 'Qty. Sequence', dataIndex: 'QTY_SEQUENCES', flex: 0.4},
                                                    {text: 'New Header ID', dataIndex: 'NEW_HEADER_ID', flex: 1},
                                                    {text: 'New File Name', dataIndex: 'NEW_FILENAME', flex: 1},
                                                    {text: 'Praxis ID', dataIndex: 'NEW_PRAXIS_ID', flex: 1}
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
                    id: prototype.idDEheader + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: {
                        click: 'onSaveRecord'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDEheader + '-btn-cancel',
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
                    itemId: prototype.idDEheader + '-userDetails',
                    dock: 'bottom',
                    //margin: '0 0 5 0',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'end'
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                            pack: 'end'
                        },
                        border: false,
                        bodyStyle: 'background: transparent',
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