/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. 
 */
prototype.url = CONTEXTPATH + '/DisputemanagementMyarcForm';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;

Ext.define('Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DetailDisputeGestionMyarc', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailDisputeGestionMyarc',
    controller: 'DetailDisputeGestionMyarcController',
    requires: [
        'Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DetailDisputeGestionMyarcController',
                //'Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer'
    ],
    title: 'DISPUTED ADM - MEMO MANAGER',
    header: true,
    bodyStyle: 'background: transparent',
    height: 830,
    width: 870,
    border: false,
    resizable: false,
    layout: 'fit',
    id: prototype.idDisputeGestionMyarc + '-PrincipalContenedor',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.idDisputeGestionMyarc + '-contenedor-form',
            layout: 'vbox',
            defaults: {
                style: 'margin: 2px'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.idDisputeGestionMyarc + '-contenedor',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-nmemo',
                            fieldLabel: 'Memo number', readOnly: true,
                            labelWidth: 85,
                            labelAlign: 'center',
                            maxLength: 10,
                            enforceMaxLength: 10,
                            maskRe: /[0-9]/,
                            width: 180
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-country',
                            fieldLabel: 'Country', readOnly: true,
                            labelWidth: 45,
                            maxLength: 10,
                            labelAlign: 'center',
                            width: 90
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-iata', readOnly: true,
                            fieldLabel: 'IATA',
                            labelWidth: 30,
                            maxLength: 10,
                            labelAlign: 'center',
                            width: 100
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-Service',
                            fieldLabel: 'Auditor',
                            labelWidth: 40,
                            readOnly: true,
                            labelAlign: 'center',
                            width: 150
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-DisputeDate',
                            fieldLabel: 'Dispute Date', readOnly: true,
                            labelWidth: 75,
                            labelAlign: 'center',
                            width: 150
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.idDisputeGestionMyarc + '-contenedor2',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-Origin',
                            fieldLabel: 'Origin', readOnly: true,
                            labelWidth: 40,
                            labelAlign: 'center',
                            width: 150
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-Area',
                            fieldLabel: 'Area', readOnly: true,
                            labelWidth: 40,
                            labelAlign: 'center',
                            width: 200
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-Base',
                            fieldLabel: 'Base', readOnly: true,
                            labelWidth: 40,
                            labelAlign: 'center',
                            width: 150
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDisputeGestionMyarc + '-Days',
                            fieldLabel: 'Days', readOnly: true,
                            labelWidth: 40,
                            labelAlign: 'center',
                            width: 150
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDisputeGestionMyarc + '-gridTKT',
                            width: 850,
                            height: 150,
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Ticket', dataIndex: 'A2548TIKET', align: 'center', width: 100, sortable: false},
                                    {text: 'Cur.', dataIndex: 'A2548MDA', align: 'center', width: 40, sortable: false},
                                    {text: 'Fare', dataIndex: 'A2548TARID', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Taxes', dataIndex: 'A2548TTAXD', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Commission', dataIndex: 'A2548COMID', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Tax on </br> Commission', dataIndex: 'A2548TAXCD', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Penaltie', dataIndex: 'A2548PENAD', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Charge', dataIndex: 'A2548TCARD', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    },
                                    {text: 'Net', dataIndex: 'A2548NETO', flex: 1, align: 'right',
                                        renderer: 'onColumnAirlineRenderer', summaryType: 'sum',
                                        summaryRenderer: 'OnAirlineSummary'
                                    }

                                ]
                            }, viewConfig: {
                                trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDisputeGestionMyarc + '-gridRazon',
                            width: 850,
                            height: 120,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Codigo', dataIndex: 'A2553CODE', align: 'center', width: 90, sortable: false},
                                    {text: 'Family', dataIndex: 'A2553TYPO', align: 'center', width: 80, sortable: false},
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1, align: 'left',
                                        listeners: {
                                            click: 'metadata_detalle2'
                                        },
                                        renderer: function (value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    }
                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDisputeGestionMyarc + '-gridDispuRazon',
                            width: 850,
                            height: 150,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Service <br> Agent', dataIndex: 'A4138TYPE', align: 'center', width: 90, sortable: false},
                                    {text: 'Date', dataIndex: 'A4138FREGI', align: 'center', width: 90, sortable: false},
                                    {text: 'Description', dataIndex: 'A4138DESCR', flex: 1, align: 'left',
                                        listeners: {
                                            click: 'metadata_detalle'
                                        },
                                        renderer: function (value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    },
                                    {text: 'Status', dataIndex: 'A4138STAT', align: 'center', width: 100, sortable: false},
                                    {text: 'File Status', dataIndex: 'A4138STAR', align: 'center', width: 100, sortable: false},
                                    {
                                        text: 'File',
                                        dataIndex: 'A4138ARCHV',
                                        flex: 1,
                                        renderer: 'OnColumnAuditorRenderer'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'textareafield',
                            id: prototype.idDisputeGestionMyarc + '-Disputa',
                            labelWidth: 85,
                            width: 850,
                            height: 80, readOnly: true,
                            grow: true,
                            maxLength: 200,
                            enforceMaxLength: true,
                            name: 'Disputa',
                            fieldLabel: 'Disputa'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'textareafield',
                            id: prototype.idDisputeGestionMyarc + '-Argument',
                            labelWidth: 85,
                            width: 850,
                            height: 80,
                            grow: true,
                            maxLength: 300,
                            enforceMaxLength: true,
                            name: 'Argument',
                            fieldLabel: 'Argument'
                        }

                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.idDisputeGestionMyarc + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            //layout: 'hbox',
                            id: prototype.idDisputeGestionMyarc + '-File',
                            name: 'fileaudito', //prototype.id1 + '-File',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 25,
                            width: 800,
                            // buttonOnly: true,
                            // hideLabel: true,
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onFileChange'
                            }
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    //title: 'UPLOAD FILE - BSPLINK MANAGEMENT',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [

                        {
                            xtype: 'combo',
                            id: prototype.idDisputeGestionMyarc + '-ComboStatus',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 180,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender',
                                change: 'onCmbSearchChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDisputeGestionMyarc + '-ComboStatus2',
                            hidden: true,
                            fieldLabel: 'Status Accpted',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 300,
                            labelWidth: 150,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbStatusAfterRender'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'fieldcontainer',
                            //fieldLabel: 'File',
                            defaultType: 'checkboxfield',
                            items: [
                                {
                                    boxLabel: 'File',
                                    id: prototype.idDisputeGestionMyarc + '-checkboxArchivo',
                                    name: 'File',
                                    inputValue: '1',
                                    width: 40,
                                    labelWidth: 80,
                                    listeners: {
                                        change: 'onFileChange'
                                    }
                                }
                            ]
                        }

                    ]
                }



            ]
        }
    ], dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [{
                    icon: 'resources/img/botones/16x16/1400098721_cv.png',
                    text: 'File',
                    id: prototype.idDisputeGestionMyarc + '-BtnFile',
                    height: 30,hidden:true,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickFile'
                    }
                }, {
                    icon: 'resources/img/botones/24x24/1337982029_3floppy_unmount.png',
                    text: 'Save',
                    id: prototype.idDisputeGestionMyarc + '-BtnSave',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickSave'
                    }
                },
                {
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    text: 'Cancel',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});


