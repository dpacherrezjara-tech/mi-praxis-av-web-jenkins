Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryStatementReconciliationsForm',
    requires: [
        'Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController'
    ],
    controller: 'DataEntryStatementReconciliationsController',
    title: 'Statement Reconciliation - Data Entry Form',
    header: true,
    height: 770,
    width: 1100,
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
                textDecoration: 'underline',
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
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '0 20 3 10',
                            width: 1100,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Bank Information',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 20,
                                    margin: '4 200 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCODEBANK',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCODEBANKA',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Name',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNAME',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 160,
                                        },
                                        {xtype: 'tbspacer', width: 325}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Account Stattement',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTVAL',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            readOnly: true,
                                            fieldStyle: 'text-align:center;',
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Date Conci.',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATECI',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Tranc Numb.',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTRANCI',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Sett.',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYTRAN1',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 205},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Value Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtVALDATE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Unique Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtUNICODE',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Id.Bank',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Neto',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNETO',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Settlement',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 234,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Value Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtVALDATEL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Unique Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtUNICODEL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'label',
                                            text: 'Id.Bank',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOCL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCYL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Neto',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNETOL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#efe5e5;',
                                    margin: '0 2 0 20',
                                    items: [
                                        {xtype: 'tbspacer', width: 7, height: 24},
                                        {
                                            xtype: 'label',
                                            text: 'Card Nbr.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtACCNUMBER',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 110
                                        },
                                        {xtype: 'tbspacer', width: 650},
                                        {
                                            xtype: 'label',
                                            text: 'Diff',
                                            textAlign: 'center',
                                            paddingLeft: 3,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDIFF',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 5}
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: 'Detail Settlement',
                                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                                    bodyStyle: 'background:#E5ECEF;',
                                    fontSize: '11',
                                    width: 280,
                                    height: 20,
                                    margin: '4 2 4 8'
                                },
                                {xtype: 'tbspacer', height: 5},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelScanCard',
                                    layout: 'hbox',
                                    hidden: false,
                                    border: false,
                                    margin: '0 2 10 20',
                                    bodyStyle: 'background:#;',
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Value Date:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFromADATE',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Format valid YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: false,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Acc Number:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtACCNUMBER',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 16,
                                            width: 120,
                                            enableKeyEvents: true,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Amount:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 75
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNETO',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 16,
                                            width: 120,
                                            enableKeyEvents: true,
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Unique Code:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 0 4 4',
                                            width: 90
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id01 + '-chkUNICODE',
                                            checked: true,
                                            padding: '0px 0px 0px 5px',
//                                            boxLabel: 'Value'
                                            listeners: {
                                                change: 'cambiaParams'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 130},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            //margin: '4 4 4 4',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'cambiaParams'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'button',
                                            width: 25,
//                                            margin: '4 4 4 4',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clean',
                                            listeners: {
                                                click: 'clear_keyDownHandler'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'button',
                                            width: 25,
//                                            margin: '4 4 4 4',
                                            iconCls: 'prx-icon-excel',
                                            tooltip: 'Download excel',
                                            listeners: {
                                                click: 'getExcel'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
//                                            margin: '4 4 4 4',
                                            iconCls: 'prx-icon-edit',
                                            tooltip: 'Calculate Differences',
//                                            hidden: true,
                                            reference: 'calculateButton',
                                            listeners: {
                                                click: 'calcularDiferencias'
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelScanCard2',
                                    layout: 'hbox',
                                    hidden: false,
                                    border: false,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#;',
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Sale Date:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 70
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtFromSDATE',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Format valid YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: false,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Card Code:',
                                            textAlign: 'center',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            margin: '4 4 4 4',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSCARCOD',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 200,
                                            labelWidth: 10,
                                            hidden: false,
                                            hiddenLabel: false,
                                            editable: false
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '10 0 0 20',

                                    //bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            hidden: true,
                                            id: prototype.id + '-panelDataInfoScan',
                                            layout: 'vbox',
                                            border: false,
                                            width: 1027,
                                            height: 282,
                                            hidden: false,
                                            autoScroll: true,
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataInfoScan',
                                                    width: 1025,
                                                    height: 280,
                                                    columnLines: true,
                                                    plugins: [
                                                        {
                                                            ptype: 'cellediting',
                                                            clicksToEdit: 1
                                                        }
                                                    ],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Status', dataIndex: 'descSTVAL', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Sales Date', dataIndex: 'SDATE', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Agent', dataIndex: 'SAGENT', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Terminal', dataIndex: 'TERMI', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Credit Card',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Type', dataIndex: 'CARDTYPE', width: 50,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Number', dataIndex: 'SCARDN', width: 130,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {text: 'Auth.<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    value = 'COP';
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Total', dataIndex: 'TOTAL', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Neto',
                                                                dataIndex: 'NETO',
                                                                width: 110,
                                                                xtype: 'gridcolumn',
                                                                cls: 'detalle-neto', // Agrega una clase personalizada a las celdas de detalle NETO
                                                                renderer: function (value, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    if (record.get('isInValidCombination')) {
                                                                        metaData.style += "background-color: yellow;"; // Aplicar estilo si el registro está en una combinación válida
                                                                    }
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                },
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    editable: true,
                                                                    allowBlank: false,
                                                                    enableKeyEvents: true,
                                                                    maskRe: /[0-9\.-]/,
                                                                    selectOnFocus: true,
                                                                    listeners: {
                                                                        specialkey: 'eventKeyAdjustment',
                                                                    }
                                                                }
                                                            },
                                                            {text: 'Red', dataIndex: 'RED', width: 50,
//                                                                editor: {xtype: 'textfield', editable: true},
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                sortable: false,
                                                                xtype: 'actioncolumn',
                                                                width: 40,
                                                                text: 'Del.',
                                                                id: prototype.id + '-gridColumnDelete',
                                                                align: 'center',
                                                                items: [
                                                                    {
                                                                        iconCls: 'prx-icon-image-trash',
                                                                        tooltip: 'Delete',
                                                                        handler: 'removeTKT'
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    }
                                                },
                                            ],
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '0 0 0 350',
                                    items: [
                                        {xtype: 'tbspacer', width: 380},
                                        {
                                            xtype: 'label',
                                            text: 'Sum Amount:',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSumAmount',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            width: 110,
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 180,
                    margin: '8 2 4 160'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    margin: '0 2 0 180',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 2',
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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 100,
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
                            margin: '8 2 4 2',
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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 100,
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
            margin: '0 0 0 8',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:left',
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
                },
                {
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    margin: '0 0 0 8',
                    hidden: true,
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    hidden: true,
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
}
);