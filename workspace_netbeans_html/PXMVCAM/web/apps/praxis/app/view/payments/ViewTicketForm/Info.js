/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.payments.ViewTicketForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1800,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: #E3EAEF;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: #E3EAEF',
                    border: false,
                    layout: 'vbox',
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
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTICKET',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Ticket Number',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSAGENT',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Agent',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtMERCHNC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Merchant',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSDATE',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Sales Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSCOUNTRY',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Country',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSPNR',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'PNR',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTDOC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Doc. Type',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtEMDC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'EMD Code',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtEMDSC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'EMD Sub Code',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
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
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTCON',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Status',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFCONT',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIDCON',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'ID',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Payment Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSCARCOD',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Card Code',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSCARDN',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Card Nbr.',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSAUTHOC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Auth. Code',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSDATEXP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Exp. Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtINSTPLA',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Inst. Pay. Plan.',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSCURRENCY',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Currency',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSVFOP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Transact. Amount',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtINSTPAY',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Inst. Payment',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Settlement Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAFARE',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Fare',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: right;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtATAX',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Tax.',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: right;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAIVA',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'IVA',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: right;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTOTAL',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Total',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: right;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            padding: '4px 4px 4px 4px',
                            defaults: {
                                anchor: '100%',
                                width: 185
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnAccounting',
                                    margin: '0 0 0 30',
                                    text: '<strong style="color:white;">Accounting<strong>',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    width: 95,
                                    listeners: {
                                        click: 'btnAccounting_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnPayment',
                                    margin: '0 0 0 30',
                                    text: '<strong style="color:white;">Payment<strong>',
                                    cls: 'x-btn-sent',
                                    overCls: 'x-btn-sent-over',
                                    width: 80,
                                    listeners: {
                                        click: 'btnPayment_clickHandler'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Conciliate',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTVAL',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Status',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDATEC',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Conciliation Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFVOID',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Void',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFREVERSA',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Reverse Policy',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFREVADM',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Reverse ADM',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFADM',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'ADM',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                                                
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Control Data',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Creator User',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Creation Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Creation Time',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPGMCR',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Creation Program',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 4px 8px 4px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'User Update',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Update Date',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Update Time',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPGMUP',
                                    required: true,
                                    editable: true,
                                    fieldLabel: 'Update Program',
                                    width: 250,
                                    labelWidth: 120,
                                    readOnly: true,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left'
                                },
                            ]
                        },
                    ]
                }

            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

