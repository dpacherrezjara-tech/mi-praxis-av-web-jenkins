/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.Postbilling.DetailPostbilling', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailPostbilling',
    controller: 'DetailPostbillingController',
    requires: [
        'Ext.Praxis.controller.salesaudit.Postbilling.DetailPostbillingController',
        'Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer'
    ],
    id: prototype.id1 + '-win',
    title: 'PENDING POST BILLING DISPUTES - BSPLINK MANAGEMENT',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 780,
    width: 950,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id1 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-nmemo',
                            fieldLabel: 'TDNR',
                            labelWidth: 35,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-trnc',
                            fieldLabel: 'TRNC',
                            labelWidth: 45,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-pbda',
                            fieldLabel: 'PBD Amount',
                            labelWidth: 90,
                            width: 200,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-disputable',
                            fieldLabel: 'Disp. Amount',
                            labelWidth: 80,
                            width: 200,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-pbdadif',
                            fieldLabel: 'Amount Dif.',
                            labelWidth: 80,
                            width: 200,
                            value: '0000',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-country',
                            fieldLabel: 'Country',
                            labelWidth: 55,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        }
                        
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-dias',
                            fieldLabel: 'Is. Date',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-mda',
                            fieldLabel: 'Currency',
                            labelWidth: 50,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        /*{
                            xtype: 'textfield',
                            id: prototype.id1 + '-BillingPeriod',
                            fieldLabel: 'Billing Period',
                            labelWidth: 80,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },  */                                              
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-PBDate',
                            fieldLabel: 'PBD Date',
                            labelWidth: 60,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-ResoDate',
                            fieldLabel: 'Resolution Date',
                            labelWidth: 90,
                            width: 170,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-iata',
                            fieldLabel: 'IATA',
                            labelWidth: 30,
                            width: 120,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {xtype: 'textfield',id: prototype.id1 + '-txtpreme', hidden: true},
                        {xtype: 'textfield',id: prototype.id1 + '-txtconxp', hidden: true}
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id1 + '-gridTKT',
                            title: 'Documents',
                            columnLines: true,
                            autoScroll: true,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Ticket', dataIndex: 'A2548TIKET', width: 100},
                                    {text: 'Document', dataIndex: 'A2548NMEMO', width: 100,hidden: true},
                                    {text: 'Cur.', dataIndex: 'A2548MDA', flex: 1},
                                    {text: 'Fare', dataIndex: 'A2548TARID', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Taxes', dataIndex: 'A2548TTAXD', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Commi.', dataIndex: 'A2548COMID', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'TOCA', dataIndex: 'A2548TAXCD', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Penaltie', dataIndex: 'A2548PENAD', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Charge', dataIndex: 'A2548TCARD', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                                    {text: 'Net', dataIndex: 'A2548NETO', width: 90, align: 'right',
                                        summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            },
                            height: 150,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id1 + '-gridRazon',
                            title: 'Documents Agent',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {
                                        text: 'Service <br> Agent', dataIndex: 'A2553TYPO', align: 'center', width: 90, sortable: false
                                    },
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1, align: 'left',
                                        listeners: {
                                            click: 'metadata_detalle'
                                        },
                                        renderer: function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'ESTADO', align: 'center', width: 100, sortable: false
                                    },
                                    {
                                        text: 'File',
                                        dataIndex: 'A2553ARCHV',
                                        width: 90,
                                        renderer: 'OnColumnHistoRenderer'
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 150,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id1 + '-gridDispuRazon',
                            columnLines: true,
                            autoScroll: true,
                            columns: {
                                items: [
                                    {
                                        text: 'Service <br> Agent', dataIndex: 'A3537TYPE', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Date', dataIndex: 'A3537FREGI', align: 'center', width: 90, sortable: false
                                    },
                                    {text: 'Description', dataIndex: 'A3537NCONX', flex: 1, align: 'left',
                                        listeners: {
                                            click: 'metadata_razon'
                                        },
                                        renderer: function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A3537FLAG', align: 'center', width: 200, sortable: false
                                    },
                                    {
                                        text: 'File',
                                        dataIndex: 'A3537FFILE',
                                        flex: 1,
                                        renderer: 'OnColumnAuditorRenderer'
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            height: 200,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            id: prototype.id1 + '-Disputa',
                            labelWidth: 85,
                            width: 850,
                            height: 80, readOnly: true,
                            //grow: true,
                            //maxLength: 200,
                            //enforceMaxLength: true,
                            name: 'Disputa',
                            fieldLabel: 'Disputa'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id1 + '-Argumentpripa',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'textareafield',
                            id: prototype.id1 + '-Argument',
                            labelWidth: 85,
                            width: 850,
                            height: 80,
                            grow: true,
                            maxLength: 500,
                            enforceMaxLength: true,
                            name: 'Argument',
                            fieldLabel: 'Argument'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id1 + '-ArgumenFile1',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.id1 + '-File',
                            name: 'fileaudito',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id1 + '-ArgumenFile2',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.id1 + '-File2',
                            name: 'fileaudito2',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id1 + '-ArgumenFile3',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.id1 + '-File3',
                            name: 'fileaudito3',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id1 + '-contenedor-status',
                    layout: 'hbox',
                    hidden: true,
                    defaults: {
                        style: 'margin: 1px'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id1 + '-ComboStatus',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'left',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id1 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id1 + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});