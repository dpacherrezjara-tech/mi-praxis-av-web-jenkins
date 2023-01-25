/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : DataEntry                                         *
 * Created on : 12-10-2016, 14:32:40                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 12-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.DataEntry', {
    extend: 'Ext.window.Window',
    title: 'Conciliation ASR',
    bodyStyle: 'background: transparent',
    header: true,
    width: 470,
    height: 385,
    border: false,
    resizable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    modal: true,
    items: [
        {
//            region: 'center',
            xtype: 'form',
            id: 'vConciliationASR-DataEntry-center',
            border: false,
            padding: '5px 5px 5px 5px',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    layout: 'column', border: false, margin: '0px 0px 0px 0px',
                    items: [
                        {
                            width: 240, border: false,
                            padding: '5px 5px 0px 0px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtWKSTAT',
                                    fieldLabel: '<strong style="color:#000;">IATA</strong>',
                                    fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                    readOnly: true,
                                    labelWidth: 110,
                                    labelAlign: 'right',
                                    width: '100%',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtFREPOR',
                                    fieldLabel: '<strong style="color:#000;">Open Date</strong>',
                                    fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                    readOnly: true,
                                    labelWidth: 110,
                                    labelAlign: 'right',
                                    width: '100%',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtMDA',
                                    fieldLabel: '<strong style="color:#000;">Currency</strong>',
                                    labelWidth: 110,
                                    fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                    readOnly: true,
                                    labelAlign: 'right',
                                    width: '100%',
                                    anchor: '100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 0px 0px 0px',
                    items: [
                        {
                            width: 114,
                            border: false
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'INTERACT',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            id: 'vConciliationASR-DataEntry-lblPRAXIS',
                            html: '<span style="color:#000;font-weight:bold;text-decoration:underline;" data-qtip="View Praxis Detail">PRAXIS</span>',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'DIFFERENCE'
                        }
                    ]
                },
                //CASH
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 2px',
                    items: [
                        {
                            xtype: 'label',
                            width: 80,
                            html: '<strong style="color:#000;">Cash: </strong>',
                            margin: '0 0 0 30'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtInteractCA',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }
                            ]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtPraxisCA',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtDifferencesCA',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }]
                        }
                    ]
                },
                //CREDITO
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 2px',
                    items: [
                        {
                            xtype: 'label',
                            width: 80,
                            html: '<strong style="color:#000;">Credit: </strong>',
                            margin: '0 0 0 30'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtInteractCC',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }
                            ]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtPraxisCC',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtDifferencesCC',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }]
                        }
                    ]
                },
                //PRAXIS Detail
                {
                    layout: 'hbox',
                    id: 'vConciliationASR-DataEntry-boxPraxisDetail',
                    border: false, margin: '0px 5px 5px 2px',
                    hidden: true,
                    height: 100,
                    items: [
                        {
                            xtype: 'label',
                            width: 80,
                            html: '<strong style="color:#000;">PRAXIS Detail</strong>',
                            margin: '0 0 0 30'
                        },
                        {
                            border: false,
                            padding: '2px 2px 2px 2px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'grid',
                                    width: 295,
                                    height: 96,
                                    id: 'vConciliationASR-DataEntry-gridPraxisDetail',
                                    store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.GridPraxisDetails'),
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Type', dataIndex: 'TTYPE', width: 95},
                                            {text: 'Amount', dataIndex: 'A1720_AMT', align: 'right', flex: 1,
                                                renderer: function (value, metadata) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                //STATUS
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 2px',
                    items: [
                        {
                            xtype: 'label',
                            width: 80,
                            html: '<strong style="color:#000;">Indicator: </strong>',
                            margin: '0 0 0 30'
                        },
                        {
                            width: 40, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntry-txtIndicator',
                                    fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                    readOnly: true,
                                    width: 30
                                }
                            ]
                        }, {
                            xtype: 'label',
                            html: '<strong style="color:#000;">A=Match</strong>',
                            //width: 180,
                            margin: '5 5 5 5'
                        }, {
                            xtype: 'label',
                            html: '<strong style="color:#000;">M=Manual</strong>',
                            //width: 180,
                            margin: '5 5 5 5'
                        }, {
                            xtype: 'label',
                            html: '<strong style="color:#000;">D=Difference</strong>',
                            //width: 180,
                            margin: '5 5 5 5'
                        }]
                },
                //COMENTARIO
                {
                    layout: 'hbox', border: false, margin: '0px 0px 0px 0px',
                    items: [
                        {
                            xtype: 'label',
                            width: 80,
                            html: '<strong style="color:#000;">Comment: </strong>',
                            margin: '0 0 0 30'
                        },
                        {
                            width: 450, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: 'vConciliationASR-DataEntry-txtComment',
                                    width: 298,
                                    grow: false,
                                    fieldStyle: 'font-size:13px;text-align:left;'
                                            //readOnly:true
                                }
                            ]
                        }]
                },
                //AUDIT
                {
                    layout: 'hbox', border: false, //margin: '0px 0px 0px 0px',
                    items: [{
                            xtype: 'fieldset',
                            title: 'Control data',
                            width: '100%',
                            border: true,
                            layout: 'hbox',
                            margin: '0 4 10 4', //top right botton left 
                            columnWidth: 0.5,
                            items: [
                                {
                                    layout: 'hbox', border: false, width: 120, padding: '0px 2px 4px 2px',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'vConciliationASR-DataEntry-txtUser',
                                            fieldLabel: '<strong style="color:#000;">User</strong>',
                                            labelWidth: 30,
                                            fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                            readOnly: true,
                                            width: 110
                                        }]
                                },
                                {
                                    layout: 'hbox', border: false, width: 120, padding: '0px 2px 4px 2px',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'vConciliationASR-DataEntry-txtDate',
                                            fieldLabel: '<strong style="color:#000;">Date</strong>',
                                            fieldStyle: 'font-size:13px;text-align:center;background:#cae2f2;',
                                            readOnly: true,
                                            labelWidth: 30,
                                            width: 110
                                        }]
                                }]
                        }]
                }
            ],
            bbar: [
                {
                    xtype: 'button',
                    id: 'vConciliationASR-DataEntry-btnSave',
                    icon: 'resources/img/botones/Save.png',
                    text: 'Save',
                    scale: 'medium'
                },
                ' ',
                {
                    xtype: 'button',
                    id: 'vConciliationASR-DataEntry-btnCancel',
                    icon: 'resources/img/botones/cancel.png',
                    scale: 'medium',
                    text: 'Cancel',
                    height: 30
                }
            ]
        }
    ]
});