Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryConciliationASRForm',
    requires:[
        'Ext.Praxis.controller.sales.ConciliationASR.DataEntryConciliationASRController'
    ],
    controller: 'DataEntryConciliationASRController',
    title: 'Conciliation ASR',
    bodyStyle: 'background: transparent',
    header: true,
    width: 470,
    height: 500,
    border: false,
    resizable: false,
    layout:'fit',
    defaults: {
        border: false
    },
    modal: true,
    items: [
        {
//            region: 'center',
            xtype: 'form',
            id: prototype.id+'-DataEntry-center',
            border: false,
//            padding: '5px 5px 5px 5px',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                
                {
                    layout: 'column', border: false, margin: '0px 0px 0px 7px',
                    items: [
                        {
                            width: 240, border: false,
                            padding: '5px 5px 0px 0px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtWKSTAT',
                                    fieldLabel: '<strong style="color:#000;">IATA</strong>',
                                    fieldStyle: 'font-size:13px;text-align:left;background:#cae2f2;',
                                    readOnly: true,
                                    labelWidth: 110,
                                    labelAlign: 'left',
                                    width: '100%',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtFREPOR',
                                    fieldLabel: '<strong style="color:#000;">Open Date</strong>',
                                    fieldStyle: 'font-size:13px;text-align:left;background:#cae2f2;',
                                    readOnly: true,
                                    labelWidth: 110,
                                    labelAlign: 'left',
                                    width: '100%',
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtMDA',
                                    fieldLabel: '<strong style="color:#000;">Currency</strong>',
                                    labelWidth: 110,
                                    fieldStyle: 'font-size:13px;text-align:left;background:#cae2f2;',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    width: '100%',
                                    anchor: '100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 0px 0px 7px',
                    items: [
                        {
                            width: 114,
                            border: false
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'Date',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'Name',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'Status',
                            width: 100
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Header</strong>'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtHeaderDate',
                                    fieldStyle: 'font-size:13px;text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 95
                                }
                            ]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtHeaderName',
                                    fieldStyle: 'font-size:13px;text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 95
                                }]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtHeaderStatus',
                                    fieldStyle: 'font-size:13px;text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 95
                                }]
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 0px 0px 7px',
                    items: [
                        {
                            width: 114,
                            border: false
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'Cash',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            text: 'Credit',
                            width: 100
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Sale</strong>'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtSaleCash',
                                    fieldStyle: 'font-size:13px;text-align:right;',
                                    //enforceMaxLength: true,
                                    //maxLength: 10,
                                    width: 95
                                }
                            ]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtSaleCredit',
                                    fieldStyle: 'font-size:13px;text-align:right;',
                                    //enforceMaxLength: true,
                                    //maxLength: 10,
                                    width: 95
                                }]
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Refund</strong>'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtRefundCash',
                                    fieldStyle: 'font-size:13px;text-align:right;',
                                    //enforceMaxLength: true,
                                    //maxLength: 10,
                                    width: 95
                                }
                            ]
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [{
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtRefundCredit',
                                    fieldStyle: 'font-size:13px;text-align:right;',
                                    //enforceMaxLength: true,
                                    //maxLength: 10,
                                    width: 95
                                }]
                        }
                    ]
                },
                {
                    layout: 'hbox', border: false, margin: '0px 0px 0px 7px',
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
                            xtype: 'button',
                            id:prototype.id+'-lnkPRAXIS',
//                            style: 'font-weight:bold;background:transparent;',
                            html: '<strong style="background:transparent;color:#000;text-decoration:underline;font-size:13px;" data-qtip="View Praxis Detail">PRAXIS</strong>',
                            border: false,
                            scale: 'small',
                            width: 92,
                            height: 17,
                            padding: '0',
                            listeners:{
                                click: 'lnkPRAXIS_clickHandler'
                            }
                        },
                        {
                            xtype: 'label',
                            style: 'color:#000;font-weight:bold;',
                            margin: '0 0 0 6',
                            text: 'DIFFERENCE'
                        }
                    ]
                },
                //CASH
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Cash: </strong>'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtInteractCA',
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
                                    id: prototype.id+'-DataEntry-txtPraxisCA',
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
                                    id: prototype.id+'-DataEntry-txtDifferencesCA',
                                    fieldStyle: 'font-size:13px;text-align:right;background:#cae2f2;',
                                    readOnly: true,
                                    width: 95
                                }]
                        }
                    ]
                },
                //CREDITO
                {
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Credit: </strong>'
                        },
                        {
                            width: 100, border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent', // '10 5 3 10' (top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtInteractCC',
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
                                    id: prototype.id+'-DataEntry-txtPraxisCC',
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
                                    id: prototype.id+'-DataEntry-txtDifferencesCC',
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
                    id: prototype.id+'-DataEntry-boxPraxisDetail',
                    border: false, margin: '0px 5px 5px 7px',
                    hidden: true,
                    height: 100,
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">PRAXIS Detail</strong>'
                        },
                        {
                            border: false,
                            padding: '2px 2px 2px 2px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'grid',
                                    width: 297,
                                    height: 90,
                                    columnLines: true,
                                    id: prototype.id+'-DataEntry-gridTransactions',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Type', dataIndex: 'TTYPE', width: 95,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    value = value === 'CC' ? value+'-'+data.A1720STIPO : value;
                                                    return value;
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'A1720_AMT', width: 200,
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:right;";
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
                    layout: 'hbox', border: false, margin: '0px 5px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            html: '<strong style="color:#000;">Indicator: </strong>'
                        },
                        {
                            border: false,
                            padding: '2px 2px 0px 2px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-DataEntry-txtIndicator',
                                    fieldStyle: 'font-size:13px;text-align:left;background:#CAE2F2;color:#000;',
                                    readOnly: true,
                                    width: 70
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
                    layout: 'hbox', border: false, margin: '0px 0px 0px 7px',
                    items: [
                        {
                            xtype: 'label',
                            width: 120,
                            html: '<strong style="color:#000;">Comment: </strong>'
                        },
                        {
                            width: 450, border: false,
                            padding: '2px 2px 0px 0px', bodyStyle: 'background: transparent',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    id: prototype.id+'-DataEntry-txtComment',
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
                                    layout: 'hbox', border: false, width: 200, padding: '0px 2px 4px 2px',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-DataEntry-txtUser',
                                            fieldLabel: '<strong style="color:#000;">User Audit</strong>',
                                            labelWidth: 90, 
                                            fieldStyle: 'font-size:13px;text-align:left;background:#cae2f2;',
                                            readOnly: true,
                                            width: 190
                                        }]
                                },
                                {
                                    layout: 'hbox', border: false, width: 200, padding: '0px 2px 4px 2px',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id+'-DataEntry-txtDate',
                                            fieldLabel: '<strong style="color:#000;">Date</strong>',
                                            fieldStyle: 'font-size:13px;text-align:left;background:#cae2f2;',
                                            readOnly: true,
                                            labelWidth: 60,
                                            width: 160
                                        }]
                                }]
                        }]
                }
                
            ],
            bbar: [
                {
                    xtype: 'button',
                    id:prototype.id+'-DataEntry-btn-update',
                    iconCls: 'prx-icon-update',
                    border: true,
                    scale: 'medium',
                    text: 'Update',
                    height: 30,
                    listeners:{
                        click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id+'-DataEntry-btnCancel',
                    icon: 'resources/img/botones/cancel.png',
                    border: true,
                    scale: 'medium',
                    text: 'Cancel',
                    height: 30,
                    listeners:{
                        click: 'btnCancel_clickHandler'
                    }
                }
            ]
        }
    ]
});