/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. 
 */
prototype.url = CONTEXTPATH + '/DisputeGestionBsplink';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 570;

Ext.define('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplink', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailDisputeGestionBsplink',
    controller: 'DetailDisputeGestionBsplinkController',
    requires: [
        'Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplinkController',
        'Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer'
        //'Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeGestionBsplink'
    ],
    title: 'DISPUTED ADM - BSPLINK MANAGEMENT',
    header: true,
    bodyStyle: 'background: transparent',
    height: 830,
    width: 870,
    border: false,
    resizable: false,
    layout: 'fit',
    id: prototype.id1 + '-PrincipalContenedor',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            id: prototype.id1 + '-contenedor-form',
            layout: 'vbox',
            defaults: {
                style: 'margin: 2px'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id1 + '-contenedor',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-nmemo',
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
                            id: prototype.id1 + '-country',
                            fieldLabel: 'Country', readOnly: true,
                            labelWidth: 40,
                            maxLength: 10,
                            labelAlign: 'center',
                            width: 80
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id1 + '-iata', readOnly: true,
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
                            id: prototype.id1 + '-Service',
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
                            id: prototype.id1 + '-BillingPeriod',
                            fieldLabel: 'Billing Period', readOnly: true,
                            labelWidth: 75,
                            labelAlign: 'center',
                            width: 150
                        },
                        {
                            width: 5,
                            border: false
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id1 + '-Date',
                            fieldLabel: 'Date',
                            format: 'Y/m/d',
                            labelWidth: 40,
                            readOnly: true,
                            value: new Date(),
                            labelAlign: 'right',
                            width: 120,
                            listeners: {
                                specialkey: 'onSearchkey'
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
                            id: prototype.id1 + '-gridTKT',
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
                                    {
                                        text: 'Ticket', dataIndex: 'A2548TIKET', align: 'center', flex: 1, sortable: false
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'A2548MDA', align: 'center', flex: 1, sortable: false
                                    },
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
                            id: prototype.id1 + '-gridRazon',
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
                                    {
                                        text: 'Codigo', dataIndex: 'A2548CODR1', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Family', dataIndex: 'A2548DESC1', align: 'center', width: 80, sortable: false
                                    },
                                    {text: 'Description', dataIndex: 'A2548EMISION', flex: 1, align: 'left',
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
                            id: prototype.id1 + '-gridDispuRazon',
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
                                    {
                                        text: 'Service <br> Agent', dataIndex: 'A2553REGIS', align: 'center', width: 90, sortable: false
                                    },
                                    {
                                        text: 'Date', dataIndex: 'A2553FREGI', align: 'center', width: 90, sortable: false
                                    },
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1, align: 'left',
                                        listeners: {
                                            click: 'metadata_detalle'
                                        },
                                        renderer: function (value, metadata) {
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
                                        flex: 1,
                                        renderer: 'OnColumnAuditorRenderer'
                                    }
                                    /*{text: 'File', dataIndex: 'A2553ARCHV', width: 100, align: 'center', sortable: false,
                                     listeners: {
                                     click: 'onWinFileViewerClick'
                                     },
                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                     var data = record.data;
                                     var dat = "";
                                     if (data.A2553ARCHV !== "")
                                     dat = '<a href="#salesaudit-RFND-report-form" >' + 'Download' + '</a>';
                                     return dat;
                                     }
                                     
                                     }*/
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
                            id: prototype.id1 + '-Disputa',
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
                    xtype: 'form',
                    id: prototype.id1 + '-form-01',
                    layout: 'vbox',
                    items: [{
                            xtype: 'filefield',
                            //layout: 'hbox',
                            id: prototype.id1 + '-File',
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
                        },
                        {
                            xtype: 'filefield',
                            id: prototype.id1 + '-File2',
                            name: 'fileaudito2', //prototype.id1 + '-File2',
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
                        },
                        {
                            xtype: 'filefield',
                            id: prototype.id1 + '-File3',
                            name: 'fileaudito3', //prototype.id1 + '-File3',
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
                            id: prototype.id1 + '-ComboStatus',
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
                            id: prototype.id1 + '-ComboStatus2',
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
                    icon: 'resources/img/botones/24x24/1337982029_3floppy_unmount.png',
                    text: 'Save',
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