Ext.define('Ext.Praxis.view.payments.CreditCardForm.DataEntryComm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCommCreditCardForm',
    requires: [
        'Ext.Praxis.controller.payments.CreditCard.DataEntryCommCreditCardController'
    ],
    controller: 'DataEntryCommCreditCardController',
    title: 'Credit Card Commission - Data Entry Form',
    header: true,
    height: 750,
    width: 930,
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
                    width: 1000,
                    defaults: {
                        anchor: '100%'
                    },
//                    style: {
//                        borderColor: 'black',
//                        borderStyle: 'solid'
//                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Credit Card Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;background:#E5ECEF;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 890,
                            height: 20,
                            margin: '10 2 2 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 0 8',
                            width: 890,
                            defaults: {
                                anchor: '100%'
                            },
//                            style: {
//                                borderColor: 'black',
//                                borderStyle: 'solid'
//                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODE',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners: {
                                        change: function(field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 14},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAMEC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 290,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 40
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Equivalent Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEQUIV',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 60,
                                    listeners: {
                                        change: function(field, newValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 80, height: 10},
                        {
                            xtype: 'label',
                            text: 'Bank Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;background:#DEEBDF;',
                            bodyStyle: 'background:#DEEBDF;',
                            fontSize: '11',
                            width: 890,
                            height: 20,
                            margin: '0 2 2 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#DEEBDF;',
                            margin: '0 2 2 8',
                            width: 890,
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 34},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEBANK',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAMEBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    maxChars: '40',
                                    width: 290
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 46},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCOUNTRY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    width: 60,
                                    readOnly: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#DEEBDF;',
                            margin: '0 2 2 8',
                            width: 890,
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCURRENC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 50,
                                    readOnly: false,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Flag Not Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFNOBANK',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 290,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFSTAT',
                                    fieldStyle: 'text-align:center;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 70,
                                    editable: false
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Bank BSP Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;background:#E5ECEF;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            height: 20,
                            width: 890,
                            margin: '8 2 2 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            width: 890,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 8',
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 58},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBSPBANK',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAMEBSPBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    maxChars: '40',
                                    width: 290
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            width: 890,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 8',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Comission Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;background:#DEEBDF;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    height: 20,
                                    //width: 890,
                                    margin: '8 2 4 8'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnAddComissionInformation',
                                    iconCls: 'prx-icon-add',
                                    tooltip: 'New',
                                    margin: '8 2 4 8',
                                    listeners: {
                                        click: 'btnAddComissionInformation_click'
                                    }
                                },
                            ]
                        },
                        {xtype: 'tbspacer', width: 6},
                        //Editar Comission
                        {
                            xtype: 'panel',
                            id: prototype.id + '-hboxEdit',
                            layout: 'vbox',
                            border: false,
                            width: 890,
                            hidden: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 8',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    width: 890,
                                    hidden: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'SEQ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 30
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Commission',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 220
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Date from',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Date to',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Base',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Rate',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'IVA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Months',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', height: 6},
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    width: 890,
                                    hidden: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '0 2 2 8',
                                    items: [
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSEQ',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 3,
                                            maskRe: /[0-9]/,
                                            readOnly: true,
                                            width: 30,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCCOMIS',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 3,
                                            //maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 30,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDCOMIS',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 180,
                                            //maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 190,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFECFROM',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtFECTO',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbBASEC',
                                            fieldStyle: 'text-align:left;',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 90,
                                            editable: false,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "(None)"], ["1", "MERCH"], ["2", "TOTAL VENTA"],
                                                    ["3", "OTROS"]
                                                ]
                                            }),
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRATE',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9.]/,
                                            readOnly: false,
                                            width: 60,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtRATEIVA',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9.]/,
                                            readOnly: false,
                                            width: 60,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMONTO',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9.]/,
                                            readOnly: false,
                                            width: 60,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMESES',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            //editable: true,
                                            //enabled: false,
                                            maxLength: 2,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 60,
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnImgSave',
                                            iconCls: 'prx-icon-save',
                                            tooltip: 'Save',
                                            //margin: '8 2 4 8',
                                            listeners: {
                                                click: 'btnImgSave_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnImgDelete',
                                            iconCls: 'prx-icon-delete',
                                            tooltip: 'Delete',
                                            //margin: '8 2 4 8',
                                            listeners: {
                                                click: 'btnImgDelete_click'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnImgCancel',
                                            iconCls: 'prx-icon-cancel',
                                            tooltip: 'Cancel',
                                            //margin: '8 2 4 8',
                                            listeners: {
                                                click: 'btnImgCancel_click'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            width: 893,
                            height: 200,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 12 8',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCommInfo',
                                    width: 892,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Seq', dataIndex: 'SEQ', width: 40},
                                            {text: 'Comission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'TCOMIS', width: 45},
                                                    {text: 'Description', dataIndex: 'DCOMIS', width: 250,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Effective Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'From', dataIndex: 'FECFROM', width: 90},
                                                    {text: 'To', dataIndex: 'FECTO', width: 90},
                                                ]
                                            },
                                            {text: 'Base', dataIndex: 'BASEC', width: 65, },
                                            {text: 'Rate', dataIndex: 'RATE', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'IVA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Rate', dataIndex: 'RATEIVA', width: 65,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Min',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amt.', dataIndex: 'MONTO', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Months', dataIndex: 'MESES', width: 65},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClickDEComm'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;background:#E5ECEF;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            height: 20,
                            width: 890,
                            margin: '4 2 2 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            width: 890,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 8 8',
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Client ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCLIENTE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxChars: '40',
                                    width: 290
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '8 2 4 8'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
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
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 20',
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
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);