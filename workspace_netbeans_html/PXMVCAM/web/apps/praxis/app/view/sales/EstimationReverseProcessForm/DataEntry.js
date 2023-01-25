Ext.define('Ext.Praxis.view.sales.EstimationReverseProcessForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryEstimationReverseProcessForm',
    requires: [
        'Ext.Praxis.controller.sales.EstimationReverseProcess.DataEntryEstimationReverseProcessController'
    ],
    controller: 'DataEntryEstimationReverseProcessController',
    title: 'Estimation Accounting - Data Entry Form',
    header: true,
    height: 900,
    width: 950,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Source',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxSource2',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["IP", "IxP"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 68,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("IP");
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblCountry2',
                                    text: 'Country',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblCountryPK',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    hidden: true,
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCountry2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 80,
                                    hidden: true,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblChannel2',
                                    text: 'Chanel',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    hidden: true,
                                    width: 80
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblChannelPK',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    hidden: true,
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtChannel2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 80,
                                    hidden: true,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblCurrency',
                                    text: 'Journal currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblCurrencyPK',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCurrency',
                                    fieldStyle: 'text-align:left;color:#0B333C;',
                                    value: 'ddd',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 80,
                                    readOnly: true,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 4},
                        //<editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Clearence period',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear2',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 70,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth2',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 60,
                                    listeners: {
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPeriodo2',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-5]/,
                                    width: 28,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    text: 'Group',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtGroup',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    width: 100,
                                    readOnly: true,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'Accounting Date',
                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtAccountingDate',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 90,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'label',
                                    text: 'Close Group',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkClose',
                                    boxLabel: '',
                                    checked: true,
                                    width: 94
                                }
                            ]
                        },
                        //</editor-fold>
                        {xtype: 'tbspacer', height: 4},
                        //<editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            width: 919,
                            height: 650,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'vbox',
                                    border: false,
                                    hidden: false,
                                    bodyStyle: 'background-color: transparent;',
                                    padding: '7',
                                    defaults: {
                                        anchor: '100%',
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Details Account',
                                            style: 'font-weight:bold;text-decoration:underline;color:#0B333C;',
                                            width: 150
                                        },
                                        {xtype: 'tbspacer', height: 12},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 4 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Type Account:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cboType',
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: false,
                                                    width: 400,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        change: 'cboType_change'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 6},
                                                //<editor-fold defaultstate="collapsed" desc="Botones">
                                                {
                                                    xtype: 'panel',
                                                    width: 380,
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    bodyStyle: 'background-color: transparent;',
                                                    padding: '0',
                                                    defaults: {
                                                        anchor: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnAddAccount',
                                                            html: '<strong>Add Account</strong>',
                                                            icon: 'resources/img/botones/24x24/1337977947_add1-.png',
                                                            border: true,
                                                            scale: 'large',
                                                            padding: '0',
                                                            width: 142,
                                                            height: 32,
                                                            listeners: {
                                                                click: 'btnAddAccount_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnUpdateAccount',
                                                            html: '<strong>Update</strong>',
                                                            icon: 'resources/img/botones/24x24/1337982080_system-software-update.png',
                                                            border: true,
                                                            scale: 'large',
                                                            hidden: true,
                                                            padding: '0',
                                                            width: 115,
                                                            height: 32,
                                                            listeners: {
                                                                click: 'btnAddAccount_clickHandler'
                                                            }
                                                        },
                                                        {xtype: 'tbspacer', width: 4},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnCancelAccount',
                                                            html: '<strong>Cancel</strong>',
                                                            icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                                                            border: true,
                                                            scale: 'large',
                                                            hidden: true,
                                                            padding: '0',
                                                            width: 98,
                                                            height: 32,
                                                            listeners: {
                                                                click: 'btnCancelAccount_clickHandler'
                                                            }
                                                        }
                                                    ]
                                                }
                                                //</editor-fold>
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 4},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Account:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135CIA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    width: 30,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135UNIDA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    width: 30,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135CECOS',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    width: 50,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135UBICA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 4,
                                                    width: 40,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135CTA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 4,
                                                    width: 40,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135SCTA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    width: 50,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135EQUI',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 4,
                                                    width: 40,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135ICIA',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    width: 30,
                                                    readOnly: true
                                                },
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'label',
                                                    text: 'Desc:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135TITU',
                                                    fieldStyle: 'text-align:left;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 50,
                                                    width: 300,
                                                    readOnly: true,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 4},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Debit:',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135ACTIV',
                                                    fieldStyle: 'text-align:right;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 60,
                                                    value: '0.00',
                                                    maskRe: /[0-9.]/,
                                                    width: 70,
                                                    listeners: {
//                                                        change: 'onUpperValue',
                                                        blur: 'truncate'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Credit:',
                                                    style: 'font-weight:bold;text-align:right;color:#0B333C;',
                                                    width: 110
                                                },
                                                {xtype: 'tbspacer', width: 2},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA2135PASIV',
                                                    fieldStyle: 'text-align:right;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 60,
                                                    value: '0.00',
                                                    maskRe: /[0-9.]/,
                                                    width: 70,
                                                    listeners: {
//                                                        change: 'onUpperValue',
                                                        blur: 'truncate'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblA1740TITRA',
                                                    text: '',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblA1740TIPO',
                                                    text: '',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblA1740SUBTI',
                                                    text: '',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-lblA1740CATEG',
                                                    text: '',
                                                    hidden: true
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 20},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                bodyStyle: 'background-color: transparent;',
                                                anchor: '100%',
                                                border: false
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gvwConta">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gvwConta',
                                                    width: 890,
                                                    height: 500,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Cta', dataIndex: 'A2135CUENTA', width: 300,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#244066;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Desc', dataIndex: 'A2135TITU', flex: 1, //width: 300,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#244066;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Debit', dataIndex: 'A2135ACTIV', width: 85,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gvwConta').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.A2135ACTIV);
                                                                    return Ext.util.Format.number(total, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit', dataIndex: 'A2135PASIV', width: 85,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#244066;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var items = Ext.getCmp(prototype.id + '-gvwConta').getStore().getData().items;
                                                                    var total = 0;
                                                                    for (var i = 0; i < items.length; i++)
                                                                        total += Number(items[i].data.A2135PASIV);
                                                                    return Ext.util.Format.number(total, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Actions',
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                width: 120,
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-edit',
                                                                        tooltip: 'Edit',
                                                                        handler: 'gvwConta_editClickHandler'
                                                                    },
                                                                    {xtype: 'tbspacer', width: 5},
                                                                    {
                                                                        icon: 'resources/img/botones/16x16/delete.png',
                                                                        tooltip: 'Remove',
                                                                        handler: 'gvwConta_removeClickHandler'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
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
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'btnInsert_clickHandler'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'btnDelete_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
                {
                    xtype: 'label',
                    id: prototype.id + '-lbl_OLD',
                    hidden: true
                },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblA2134GRUPO_OLD',
                    hidden: true
                }
            ]
        }
    ]
});