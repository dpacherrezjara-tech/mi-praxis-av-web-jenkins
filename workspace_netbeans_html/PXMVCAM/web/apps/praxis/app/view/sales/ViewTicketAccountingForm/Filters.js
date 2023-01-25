/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ViewTicketAccountingForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1900
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    style: 'border-bottom: 8px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
//                        {
//                            xtype: 'label',
//                            html: '<strong style="color:#000;">Mode</strong>',
//                            align: 'left',
//                            fieldStyle: 'text-align: left;',
//                            padding: '11px 7px 8px 10px'
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbMode',
                            fieldLabel: 'Mode',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 170,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDate',
                            fieldLabel: 'Search By <strong style="color:red;font-size:13px;"> * </strong>',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 100,
                            width: 240,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCia',
                            required: true,
                            editable: true,
                            fieldLabel: 'Ticket',
                            enforceMaxLength: true,
                            maxLength: 3,
                            value: '139',
                            width: 110,
                            labelWidth: 60,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 100,
                            labelWidth: 0,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCupon1',
                            required: true,
                            editable: true,
                            value: '',
                            enforceMaxLength: true,
                            maxLength: 1,
                            fieldLabel: '',
                            width: 25,
                            labelWidth: 0,
                            maskRe: /[1-4]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCupon2',
                            required: true,
                            editable: true,
                            value: '',
                            enforceMaxLength: true,
                            maxLength: 1,
                            fieldLabel: '',
                            width: 25,
                            labelWidth: 0,
                            maskRe: /[1-4]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCupon3',
                            required: true,
                            editable: true,
                            value: '',
                            enforceMaxLength: true,
                            maxLength: 1,
                            fieldLabel: '',
                            width: 25,
                            labelWidth: 0,
                            maskRe: /[1-4]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCupon4',
                            required: true,
                            editable: true,
                            value: '',
                            enforceMaxLength: true,
                            maxLength: 1,
                            fieldLabel: '',
                            width: 25,
                            labelWidth: 0,
                            maskRe: /[1-4]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSeq',
                            required: true,
                            editable: true,
                            value: '00',
                            enforceMaxLength: true,
                            maxLength: 2,
                            fieldLabel: '',
                            width: 40,
                            labelWidth: 0,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSeqTran',
                            required: true,
                            editable: true,
                            fieldLabel: 'Transaction',
                            width: 140,
                            labelWidth: 80,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: '<b>From</b>',
                            anchor: '100%',
                            id: prototype.id + '-txtFPRDA_FROM',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: '<b>To</b>',
                            anchor: '100%',
                            id: prototype.id + '-txtFPRDA_TO',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 130,
                            labelWidth: 30
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
                            fieldLabel: '',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPais',
                            required: true,
                            editable: true,
                            value: '',
                            enforceMaxLength: true,
                            maxLength: 2,
                            fieldLabel: '',
                            width: 40,
                            labelWidth: 0,
                            maskRe: /[a-zA-Z]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbChannel',
                            fieldLabel: 'Channel',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 55,
                            width: 140,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTransaction',
                            fieldLabel: 'Transaction',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 80,
                            width: 170,
                            anchor: '100%'
                        },
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgCtlStpro',
                            fieldLabel: 'Status',
                            labelWidth: 50,
                            horizontal: true,
                            items: [
                                {boxLabel: '<strong >All</strong>', name: 'rb', inputValue: '', width: 50},
                                {boxLabel: '<strong >Error</strong>', name: 'rb', inputValue: '1', width: 60, checked: true},
                                {boxLabel: '<strong >OK</strong>', name: 'rb', inputValue: '0', width: 50}
                            ]
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTotalTran',
                            required: true,
                            editable: true,
                            readOnly: true,
                            fieldLabel: 'Total Transaction',
                            width: 200,
                            labelWidth: 120,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtMessage',
                            readOnly: true,
                            fieldLabel: 'Message',
                            width: 380,
                            labelWidth: 80
                            //fieldStyle: 'text-align: center;',
                            //labelAlign: 'left'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelTicket',
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
                            id: prototype.id + '-txtGRUPO',
                            required: true,
                            editable: true,
                            fieldLabel: 'Group',
                            width: 135,
                            labelWidth: 45,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSTGRUPO',
                            required: true,
                            editable: true,
                            fieldLabel: 'Status',
                            width: 120,
                            labelWidth: 45,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSOURCE',
                            required: true,
                            editable: true,
                            fieldLabel: 'Source',
                            width: 100,
                            labelWidth: 45,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSUBSOURCE',
                            required: true,
                            editable: true,
                            fieldLabel: 'Sub. Source',
                            width: 145,
                            labelWidth: 90,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCOUNTRY',
                            required: true,
                            editable: true,
                            fieldLabel: 'Country',
                            width: 110,
                            labelWidth: 60,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCURRENCY',
                            required: true,
                            editable: true,
                            fieldLabel: 'Loc. Currency',
                            width: 145,
                            labelWidth: 90,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIATA',
                            required: true,
                            editable: true,
                            fieldLabel: 'IATA',
                            width: 135,
                            labelWidth: 45,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            required: true,
                            editable: true,
                            fieldLabel: 'PNR',
                            width: 130,
                            labelWidth: 40,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTRNN',
                            required: true,
                            editable: true,
                            fieldLabel: 'Transaction',
                            width: 145,
                            labelWidth: 90,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCIATKT',
                            required: true,
                            editable: true,
                            fieldLabel: 'Ticket',
                            width: 110,
                            labelWidth: 60,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            width: 100,
                            labelWidth: 0,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSQ',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            width: 40,
                            labelWidth: 0,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        }
                    ]
                }
            ]
        }
    ]
});

