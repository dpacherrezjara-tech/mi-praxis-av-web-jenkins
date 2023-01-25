Ext.define('Ext.Praxis.view.payments.SalesAdjustmentForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySalesAdjustmentForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesAdjustment.DataEntrySalesAdjustmentController'
    ],
    controller: 'DataEntrySalesAdjustmentController',
    title: 'Double Payment - Data Entry Form',
    header: true,
    //height:650,
    width: 1075,
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
                    width: 1075,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'General Information',
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
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Processing Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPRDA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'AX Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAXPAYNBR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Sales Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSMERCHID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
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
                                    text: 'ID Submission',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMS',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'ID Transaction',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Plan',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNBRINSTA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINSTANBR',
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
                            text: 'Accounting Information',
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
                                    //paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSTCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    textAlign: 'center',
                                    //paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFCONTL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'ID',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 265}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Refund Bank Information',
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
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSTRFND',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 106
                                },
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
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFDATE',
                                    fieldStyle: 'text-align:center',
                                    readOnly: false,
                                    width: 100,
                                    maskRe: /[0-9]/,                                    
                                    enforceMaxLength: true,
                                    maxLength: 8
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Authorization',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 106
                                },
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
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFAUTOR',
                                    fieldStyle: 'text-align:center',
                                    readOnly: false,
                                    width: 100,
                                    maskRe: /[0-9]/,   
                                    maxLength: 8,
                                    enforceMaxLength: true,                                    
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Operation',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 106
                                },
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
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFOPERB',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: false,
                                    width: 100,
                                    maskRe: /[0-9]/,   
                                    maxLength: 10,
                                },
                                {xtype: 'tbspacer', width: 5}
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
                                    text: 'Agent',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFAUDIT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 785}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            hidden: true,
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
                                    text: 'Refund Agent',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtRFAUDIT111111',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 5}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Error Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 280,
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
                                    text: 'History',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERRORHST',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Reconcil. Sett.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERROIN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDES_CERROIN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 5},
                                {xtype: 'tbspacer', width: 160},
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Flag Selection',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFLAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Sett. vs Sales',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERROR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDES_CERROR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 5},
                                {xtype: 'tbspacer', width: 160},
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Sales Information',
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
                                    text: 'Sales Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBSUMDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPAYDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Diff. Days',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPASSED_DAYS',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Card Account Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
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
                                    text: 'Transact. Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTRANSDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'TICKET',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtISREFNBR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                    readOnly: true,
                                    maskRe: /[0-9]/,                                    
                                    enforceMaxLength: true,
                                    maxLength: 19
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maskRe: /[A-Z]/,
                                    maxLength: 6,
                                    width: 100,
                                    readOnly: true,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Approval Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
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
                            text: 'Conciliate',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 280,
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Status',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTVAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Qty Tkts',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYTKT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Transact. Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTGROSAMOUN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 5}
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
                                    text: 'Rule',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtdescFREGLA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Doc. Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTDOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Flag Compl.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFCOMPL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Sales Amount',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOPS',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            hidden: true,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {xtype: 'tbspacer', width: 120},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'tbspacer', width: 100},
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Diff. Amount',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDIFF_AMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5}
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Tkts Detail',
                            id: prototype.id + '-labelScan',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            hidden: true,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoScan',
                            layout: 'vbox',
                            border: false,
                            width: 956,
                            height: 270,
                            hidden: true,
                            autoScroll: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 40',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoScan',
                                    width: 952,
                                    height: 180,
//                                    hidden: false,
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
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    /*if (record.data.FDUPLI > 0) {
                                                     metaData.style = "text-align:center;background-color:#f58989";
                                                     }*/

                                                    value = 'Sales';

                                                    if (record.data.FDUPLIB > 0) {
                                                        value = 'Blocked'
                                                    }

                                                    if (record.data.FDESGLOSE === '1') {
                                                        value = 'Concil.'
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: 'Doc.<br>Type', dataIndex: 'descTDOC', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    if (record.data.TDOC === 'A') {
                                                        metaData.tdAttr = 'data-qtip="' + record.data.desCERROR + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            /*{text: 'Adj.<br>Type', dataIndex: 'desCERROR', width: 65,
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = "text-align:center;";
                                             return value;
                                             }
                                             },*/
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            /*if (record.data.FDUPLI > 0) {
                                                             metaData.style = "text-align:center;background-color:#f58989";
                                                             }
                                                             
                                                             if (record.data.FDUPLIB > 0) {
                                                             metaData.style = "text-align:center;background-color:#e7f589";
                                                             }
                                                             
                                                             if (record.data.FDESGLOSE === '1') {
                                                             metaData.style = "text-align:center;background-color:#9cfa89";
                                                             }*/

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Adjust.', dataIndex: 'SADJUST', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'A1531VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                },
                                                editor: {xtype: 'textfield', editable: false},
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Del.',
                                                dataIndex: '',
                                                xtype: 'widgetcolumn',
                                                align: 'center',
                                                width: 40,
                                                widget: {
                                                    xtype: 'button',
                                                    icon: 'resources/img/icon/delete.png',
                                                    tooltip: 'remove',
                                                    listeners: {
                                                        click: function (button, e, eOpts) {
                                                            var record = button.getWidgetRecord();
                                                            if (record.data.FDESGLOSE !== '1') {
                                                                meDE.removeTKT(record);
                                                            }

                                                        }
                                                    }
                                                }

                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 30,
                                                text: 'Fill',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Fill TKT & PNR',
                                                        handler: 'onTktPnr'
                                                    }
                                                ]
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Adj.',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-add',
                                                        tooltip: 'Create adjustment',
                                                        handler: 'onAdjust'
                                                    }
                                                ]
                                            },
                                            /*{
                                             text: 'Select',
                                             xtype: 'checkcolumn',
                                             id: prototype.id + '-id_checkManual',
                                             width: 50,
                                             dataIndex: 'false',
                                             listeners: {
                                             checkchange: 'checkManual'
                                             },
                                             },*/
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    id: prototype.id + '-panelADJ',
                                    border: false,
                                    hidden: true,
                                    margin: '0 2 0 20',
                                    bodyStyle: 'background:#efe5e5;',
                                    items: [
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Adjustment Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbADJTYPE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 180,
                                            labelWidth: 10,
                                            hidden: false,
                                            hiddenLabel: false
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', height: 2},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAdjustment',
                                    width: 782,
                                    height: 60,
                                    hidden: true,
                                    columnLines: true,
                                    margin: '0 2 0 100',
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            clicksToEdit: 1
                                        }
                                    ],
                                    hideHeaders: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Status', dataIndex: 'STMANUAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = 'Adjustment';
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
                                                    {text: 'Type', dataIndex: 'A1531TTARJ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Number', dataIndex: 'A1531NREF', width: 115,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval', dataIndex: 'A1531CAPL', width: 65,
                                                        editor: {xtype: 'textfield', editable: false},
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";

                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Adjust.', dataIndex: 'SADJUST', width: 55,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {header: 'Amount', dataIndex: 'A1531VFOP', width: 70, xtype: 'gridcolumn',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                listeners: {
                                                    click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
                                                        meDE.gridAdjustmentRowIndex = rowNum;
                                                    },
                                                },
                                                editor: {
                                                    xtype: 'textfield',
                                                    editable: true,
                                                    allowBlank: false,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    selectOnFocus: true,
                                                    listeners: {
                                                        /*blur: function (field, e, eOpts) {
                                                         var newVal = field.getValue().trim();
                                                         field.setValue(newVal);
                                                         meDE.refreshValuesAdjustment(self, e, eOpts);
                                                         }*/
                                                        specialkey: 'eventKeyAdjustment',
                                                    }
                                                },
                                            },
                                            {text: 'Sales<br>Amount', dataIndex: 'tot_VFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";

                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Sales<br>Date', dataIndex: 'A720FECVTA', width: 61,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'A720PNR', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'A1531TKT', width: 112,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                },
                                                editor: {xtype: 'textfield', editable: false},
                                            },
                                            {text: 'Agent', dataIndex: 'A720AGENTE', width: 62,
                                                editor: {xtype: 'textfield', editable: false},
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            /*{text: 'Adjustment Type', width: 170, dataIndex: 'CERROR',
                                             renderer: function (value, meta, record, row, col) {
                                             meta.style = "background-color:#fae2a0;";
                                             switch (value) {
                                             case '':
                                             return 'DIFERENCIA LIQUIDACION VS SALE';
                                             case '01':
                                             return 'DIFERENCIA LIQUIDACION VS SALE';
                                             case '02':
                                             return 'PAGO DUPLICADO';
                                             case '03':
                                             return 'ADM/AVISOS DE CARGO';
                                             default:
                                             return 'DIFERENCIA LIQUIDACION VS SALE';
                                             }
                                             },
                                             editor: {
                                             xtype: 'combo',
                                             store: storeComboAdj,
                                             editable: false,
                                             valueField: 'code',
                                             displayField: 'name',
                                             value: '',
                                             }
                                             },*/
                                        ]
                                    }
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
                    width: 234,
                    margin: '8 2 4 100'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 100',
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
                            margin: '8 2 4 100',
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