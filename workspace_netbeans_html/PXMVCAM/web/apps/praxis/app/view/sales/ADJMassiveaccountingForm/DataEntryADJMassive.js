/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.ADJMassiveaccountingForm.DataEntryADJMassive', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryNew',
    controller: 'DataEntryADJMassiveController',
    requires: [
        'Ext.Praxis.controller.sales.ADJMassiveaccountingForm.DataEntryADJMassiveController'
    ],
    id: prototype.idDataEntryADJMassive + '-win',
    title: 'AdjAccountind Massive',
    header: true,
    height: 600,
    width: 1270,
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
            id: prototype.idDataEntryADJMassive + '-form',
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
                            xtype: 'combo',
                            id: prototype.idDataEntryADJMassive + '-CmbTtrax',
                            fieldLabel: 'Type Of Ad',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 70,
                            labelAlign: 'right',
                            readOnly: true,
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbSearchAfterRender'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            width: 50,
                            text: 'Ticket: ',
                            style: 'font-weight:normal',
                            padding: '4px 5px 2px 8px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtCia',
                            hideLabel: true,
                            width: 35,
                            value: '139',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtFrmaSerie',
                            hideLabel: true,
                            width: 80,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtSeq',
                            hideLabel: true,
                            width: 30,
                            value: '00',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtCpnx',
                            fieldLabel: 'Cupon',
                            width: 120,
                            labelWidth: 45,
                            value: '0',
                            readOnly: true
                        },
                        {xtype: 'tbspacer', width: 200},
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtAffectation',
                            fieldLabel: 'Affectation IATA',
                            width: 245,
                            labelWidth: 110,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryADJMassive + '-txtCrtBy',
                            fieldLabel: 'Create By',
                            labelWidth: 60,
                            readOnly: true,
                            width: 180
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idDataEntryADJMassive + '-co-OriginalData1',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Correct Data',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-lblTtarjeta',
                                    fieldLabel: 'T. Card',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-lblNtarjeta',
                                    fieldLabel: 'N. Card',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-lblFsale',
                                    fieldLabel: 'F. Sale',
                                    labelWidth: 55,
                                    readOnly: true
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-lblIATA',
                                    fieldLabel: 'IAT. Sale',
                                    labelWidth: 55,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-co-TKTREFE',
                                    fieldLabel: 'TKT Refe',
                                    labelWidth: 60,readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-co-TKTSEQ',
                                    fieldLabel: 'TKT.Seq',readOnly: true,
                                    labelWidth: 60,
                                    width: 170
                                }


                            ]
                        },
                        //2
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            id: prototype.idDataEntryADJMassive + '-co-OriginalData2',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Corrected Data LOC',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-label-lblAmount',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170,
                                    value: '0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-label-lblCurrency',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-cmbTYPEUSE',
                                    fieldLabel: 'Reason',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170
                                }


                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            defaults: {
                                style: 'margin: 1px',
                                fieldStyle: 'font-weight: bold; color: blue;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 120,
                                    text: 'Corrected Data REV',
                                    style: 'font-weight:bold;text-align:center;',
                                    padding: '1px 5px 5px 8px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-co-label-lblAmount',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 170,
                                    value: '0',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-co-label-lblCurrency',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    width: 170,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryADJMassive + '-de-cmbTYUSEASS',
                                    fieldLabel: 'Use Annul',
                                    labelWidth: 60,
                                    readOnly: true,
                                    width: 170
                                }

                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Corrected Data',
                    layout: 'hbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDataEntryADJMassive + '-de-gridDataDetail',
                            width: 1260,
                            height: 300,
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
                                    {text: 'Mode', dataIndex: 'A3344TRNCU', width: 45},
                                    {text: 'SRC', width: 40, dataIndex: 'A3344FUENT'},
                                    {text: 'SUB <BR>SRC', width: 40, dataIndex: 'A3344SUBFU'},
                                    {text: 'CPN', width: 38, dataIndex: 'A3344CUPON'},
                                    {text: 'FP', width: 35, dataIndex: 'A3344CONP1'},
                                    {text: 'C1', width: 30, dataIndex: 'A3344CONP1'},
                                    {text: 'C2', width: 30, dataIndex: 'A3344CONP2'},
                                    {text: 'C3', width: 30, dataIndex: 'A3344CONP3'},
                                    {text: 'ACCOUNT<br> NUMBER', dataIndex: 'A3344CTAC', width: 170},
                                    {text: 'File', dataIndex: 'A3344FILE', width: 35},
                                    {text: 'CTY', dataIndex: 'A3344PAIS', width: 35},
                                    {text: 'LOCAL ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'CUR', dataIndex: 'A3344MDA', width: 40},
                                            {text: 'Debit', dataIndex: 'A3344DBLOC', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'},
                                            {text: 'Credit', dataIndex: 'A3344CRLOC', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'}

                                        ]
                                    },
                                    {text: 'REVENUE ',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'CUR', dataIndex: 'A3344MDA', width: 40},
                                            {text: 'Debit', dataIndex: 'A3344DBREV', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'},
                                            {text: 'Credit', dataIndex: 'A3344CRREV', width: 70, align: 'right', summaryType: 'sum', renderer: 'onColumnAirlineRenderer', summaryRenderer: 'OnAirlineSummary'}
                                        ]
                                    },
                                    {text: 'Concept', dataIndex: 'A3344TITUC', width: 100, renderer: 'onRendererColumnAttr'},
                                    {text: 'Client', dataIndex: 'A3344CLIEN', width: 60},
                                    {text: 'Dire', dataIndex: 'A3344DIRECC', width: 60},
                                    {text: 'Provider', dataIndex: 'A3344PROVE', width: 60},
                                    {text: 'PTE', width: 40, dataIndex: 'A3344MARCA'}


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
                    xtype: 'textareafield',
                    id: prototype.idDataEntryADJMassive + '-txaReference1',
                    labelStyle: 'font-weight:bold;',
                    width: 1100,
                    fieldLabel: 'Justificación',
                    labelWidth: 90,
                    readOnly: true

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
                    text: 'Close',
                    id: prototype.idDataEntryADJMassive + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});

