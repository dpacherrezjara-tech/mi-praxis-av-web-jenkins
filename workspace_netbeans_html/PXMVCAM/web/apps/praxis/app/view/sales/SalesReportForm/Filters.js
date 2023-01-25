/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.Filters', {
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
                selectOnFocus: true,
                width: 1550
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters',
                    border: false,
                    //style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'
                        },
                        {
                            xtype: 'label',
                            style: 'color:red;font-size:13px;',
                            text: '*',
                            width: 20,
                            padding: '10 5 5 5',
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        , {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDate',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateYear',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 70,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateMonth',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 55,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateDay',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 55,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-labelSource',
                            text: 'Source',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-labelSource2',
                            style: 'color:red;font-size:13px;',
                            text: '*',
                            padding: '10 5 5 5',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 70,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCountry',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Country',
                            width: 105,
                            labelWidth: 45,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBanco',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Bank',
                            width: 105,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCurrency',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Currency',
                            width: 135,
                            labelWidth: 55,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIata',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'IATA',
                            width: 145,
                            labelWidth: 45,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatus',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Status',
                            width: 130,
                            labelWidth: 50,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtGroup',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Group',
                            width: 145,
                            labelWidth: 45,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 9,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIdFil',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'IdFil',
                            width: 145,
                            labelWidth: 45,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 9,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCia',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Ticket',
                            width: 100,
                            labelWidth: 50,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 100,
                            labelWidth: 0,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 10,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});