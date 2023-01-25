/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND',{
	extend: 'Ext.window.Window',
    alias: 'widget.DetailBsplinkRefundQueryRFND',

    controller: 'DetailBsplinkRefundQueryRFNDController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFNDController',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormOfPaymentRFND',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.OriginalDataTaxesRFND',
        'Ext.Praxis.view.salesaudit.BsplinkAssociatedRFND.FormRazonesRFND',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewer',
        'Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormSabreEstatus'
    ],
    id: prototype.id01 + '-win',

    title:'',
    header:true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height:850,
    width:900,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    
    items:[
        {
           xtype: 'form',
            id: prototype.id01 + '-form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtNumber',
                            fieldLabel: 'RFND Number',
                            labelWidth: 80,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSNumber',
                            fieldLabel: 'TKT Number',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAplidate',
                            fieldLabel: 'Application date',
                            labelWidth: 95,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtHourRFND',
                            fieldLabel: 'Hour RFND',
                            labelWidth: 65,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            id: prototype.id01 + '-txtSabrestatus',
                            iconCls: 'prx-icon-image-facsimil',
                            tooltip: 'Detail Coupons',
                            listeners:{
                                click: 'onSabreStatusClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAIRLINEVAT',
                            fieldLabel: 'AIRLINE VAT',
                            labelWidth: 110,
                            value: 'xxxxxx',
                            readOnly: true,
                            flex: 1,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAGENTVAT',
                            fieldLabel: 'AGENT VAT',
                            labelWidth: 110,
                            value: 'xxxxxx',
                            readOnly: true,
                            flex: 1,
                            labelAlign: 'right',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPASSENGER',
                            fieldLabel: 'Passenger name',
                            labelWidth: 110,
                            value: 'xxxxxx',
                            readOnly: true,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtUSER',
                            fieldLabel: 'Auditor',
                            labelWidth: 50,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCURRENCY',
                            fieldLabel: 'Currency',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFROM',
                            fieldLabel: 'From',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTo',
                            fieldLabel: 'To',
                            labelWidth: 30,
                            width: 140,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAuthorise',
                            fieldLabel: 'Autho/Reje date',
                            labelWidth: 120,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTime',
                            fieldLabel: 'Time',
                            labelWidth: 30,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtStatusRFND',
                            fieldLabel: 'Status RFND',
                            labelWidth: 90,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtStatus',
                            fieldLabel: 'Status',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtDateModi',
                            fieldLabel: 'Date modified',
                            labelWidth: 100,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCOUNTRY',
                            fieldLabel: 'Country',
                            labelWidth: 50,
                            width: 100,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtSale',
                            fieldLabel: 'T. Sale',
                            labelWidth: 60,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },{
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTypeRFND',
                            fieldLabel: 'Type RFND',
                            labelWidth: 90,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px'
                    },
                    items:[
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtkt',
                            title: 'Documents Airline',
                            columnLines: true,
                            autoScroll:true,
                            columns:{
                                items:[
                                    {text: 'Airline', dataIndex: 'A3407CIA', flex: 1},
                                    {text: 'TKT\'S', dataIndex: 'A3407TKT', flex: 1},
                                    {text: 'Cpns', dataIndex: 'A3407CUPON', flex: 1},
                                    {text: 'Issued Date', dataIndex: 'A3407FVNTA', flex: 1},
                                    {text: 'Waiver Code', dataIndex: 'A3407WAIVE', flex: 1}
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridtktAGENT',
                            title: 'Documents Agent',
                            columnLines: true,
                            autoScroll:true,
                            columns:{
                                items:[
                                    {text: 'Airline', dataIndex: 'A3391CIA', flex: 1},
                                    {text: 'TKT\'S', dataIndex: 'A3391TKT', flex: 1},
                                    {text: 'Cpns', dataIndex: 'A3391CUPON', flex: 1},
                                    {text: 'Issued Date', dataIndex: 'A3391FVNTA', flex: 1},
                                    {text: 'Waiver Code', dataIndex: 'A3391WAIVE', flex: 1}
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 120,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px'
                    },
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txaReference',
                            fieldLabel: 'Reason for refund',
                            labelWidth: 130,
                            grow: true,
                            readOnly: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px'
                    },
                    items:[
                        {
                            xtype: 'textarea',
                            id: prototype.id01 + '-txaRemark',
                            fieldLabel: 'Resusmis. remark',
                            labelWidth: 130,
                            grow: true,
                            readOnly: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtAplicable',
                            fieldLabel: 'Applicable',
                            labelWidth: 80,
                            value: 'xxxxxx',
                            readOnly: true,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtRazon',
                            fieldLabel: 'Reason',
                            labelWidth: 50,
                            value: 'xxxxxx',
                            readOnly: true,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 1px',
                        fieldStyle: 'font-weight: bold; color: blue;'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCashAGENT',
                            fieldLabel: 'Cash',
                            labelWidth: 40,
                            value: 'xxxxxx',
                            readOnly: true,
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCashAmoAGENT',
                            fieldLabel: 'Cash amount',
                            labelWidth: 80,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtMSCAAGENT',
                            fieldLabel: 'MSCA',
                            labelWidth: 40,
                            width: 150,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCCAGENT',
                            fieldLabel: 'CC',
                            labelWidth: 50,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtMSCCAGENT',
                            fieldLabel: 'MSCC',
                            labelWidth: 50,
                            width: 200,
                            value: 'xxxxxx',
                            readOnly: true,
                            labelAlign: 'right',
                            hidden: true
                        },
                        {
                            xtype: 'button', hidden: true,
                            id: prototype.id01 + '-txtImageView',
                            iconCls: 'prx-icon-image-view',
                            tooltip: 'View files',
                            listeners:{
                                click: 'onImageViewClick'
                            }
                        },
                        {
                            xtype: 'button', hidden: true,
                            id: prototype.id01 + '-txtPDI',
                            iconCls: 'prx-icon-image-file',
                            tooltip: 'PDI',
                            listeners:{
                                click: 'onPDIViewClick'
                            }
                        },
                        {
                            xtype: 'button', hidden: true,
                            id: prototype.id01 + '-txtRelatedFolios',
                            iconCls: 'prx-icon-image-log',
                            tooltip: 'Related   Folios',
                            listeners:{
                                click: 'onSerecRelatedFolios'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout:{
                        type: 'table',
                        columns: 5
                    },
                    defaults:{
                        labelWidth: 120,
                        border: false,
                        labelSeparator: '',
                        style: 'margin:1px !important',
                        fieldStyle: 'font-weight: bold; color: blue; text-align: right;'
                    },
                    items:[
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Calculated Airline',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Calculated Agent',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Difference',
                            labelStyle: 'font-weight: bold;'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'FORM OF PAYMENT',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'box',
                                    id: prototype.id01 + '-txtFPAero',
                                    hidden: true,
                                    html: '<img src="resources/img/icon/16x16/check.png" width="16"/>'   
                                },
                                {
                                    xtype: 'box',
                                    id: prototype.id01 + '-txtFPAero2',
                                    hidden: true,
                                    html: '<img src="resources/img/icon/16x16/delete.png" width="16"/>'   
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'box',
                                    id: prototype.id01 + '-txtFPAGENT',
                                    hidden: true,
                                    html: '<img src="resources/img/icon/16x16/check.png" width="16"/>'   
                                },
                                {
                                    xtype: 'box',
                                    id: prototype.id01 + '-txtFPAGENT2',
                                    hidden: true,
                                    html: '<img src="resources/img/icon/16x16/delete.png" width="16"/>'   
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtFPDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'prx-icon-edit',
                            border: true,
                            listeners:{
                                click: 'onWinFormOfPaymentClick'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'GROSS FARE',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtGROSSFAREDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'panel',
                            title: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Less Gross Fare Used',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtLessGROSSFAREAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtLessGROSSFAREAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtLessGROSSFAREDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Total Gross Fare RFND',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalGROSSFAREAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalGROSSFAREAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalGROSSFAREDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Commission',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtCommissionDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Total Tax',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalTaxAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalTaxAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTotalTaxDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'prx-icon-edit',
                            border: true,
                            listeners:{
                                click: 'onWinOriginalDataTaxesClick'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Penalty',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPenaltyAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPenaltyAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtPenaltyDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'TAX on CP',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtTAXCPDIFE',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'REFUND TO PASSENGER',
                            labelWidth: 200,
                            labelSeparator: ':  '
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtREFUNDTOAero',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01 + '-txtREFUNDTOAGENT',
                            fieldLabel: '',
                            readOnly: true,
                            value: '0.00'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults:{
                                labelSeparator: '',
                                style: 'margin:0px !important',
                                fieldStyle: 'font-weight: bold; color: blue; text-align: right;'
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtREFUNDTODIFE',
                                    fieldLabel: '',
                                    readOnly: true,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtCommissionAGENT2',
                                    fieldLabel: '',
                                    value: '0.00',
                                    readOnly: true,
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtPreme',
                                    fieldLabel: '',
                                    value: '0.00',
                                    readOnly: true,
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id01 + '-txtTKTDUPLI',
                                    fieldLabel: '',
                                    value: '0.00',
                                    readOnly: true,
                                    hidden: true
                                }
                            ]
                        },
                        /*,*/
                        {
                            xtype: 'displayfield',
                            fieldLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id01 + '-contenedor-status',
                    layout: 'hbox',
                    hidden: true,
                    defaults:{
                        style: 'margin: 1px'
                    },
                    items:[
                        {
                            xtype: 'combo',
                            id: prototype.id01 + '-ComboEstatus',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'left',
                            emptyText: '',
                            listConfig:{
                                minWidth: 200
                            },
                            listeners:{
                                afterrender: 'onCmbStatusAfterrender'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Add Razon',
                            iconCls: 'prx-icon-add',
                            listeners:{
                                click: 'onAddRazonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    height: 80,
                    defaults:{
                        style: 'margin: 1px'
                    },
                    items:[
                        {
                            xtype: 'grid',
                            id: prototype.id01 + '-gridRazones',hidden: true,
                            columnLines: true,
                            autoScroll:true,
                             selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns:{
                                items:[
                                    {text: 'Code', dataIndex: 'A3404CODRZ', width: 50},
                                    {text: 'Description', dataIndex: 'A3404ERROR', width: 770,editor: 'textfield'},
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        menuDisabled: true,
                                        sortable: false,
                                        items:[
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'OnChkRFNDRemove'
                                            }
                                        ]
                                    }
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 80,
                            flex: 1
                        },{
                            xtype: 'grid',
                            id: prototype.id01 + '-gridRazonesDetall',hidden: true,
                            columnLines: true,
                            autoScroll:true,
                            
                            columns:{
                                items:[
                                    {text: 'Code', dataIndex: 'A3403CODE', width: 50},
                                    {text: 'Description', dataIndex: 'A3403ERROR', width: 770}
                                ],
                                defaults:{
                                   sortable: false,
                                   menuDisabled: true,
                                   align: 'center'
                                }
                            },
                            height: 80,
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults:{
                scale: 'medium'
            },
            layout:{
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Save',
                    id: prototype.id01+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id01+'-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});