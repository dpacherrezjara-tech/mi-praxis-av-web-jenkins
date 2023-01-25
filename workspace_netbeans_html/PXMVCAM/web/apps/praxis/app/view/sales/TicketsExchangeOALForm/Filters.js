/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.TicketsExchangeOALForm.Filters', {
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

                        }
                        , {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDate',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 120,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From',
                            anchor: '100%',
                            id: prototype.id + '-txtFDesde',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To',
                            anchor: '100%',
                            id: prototype.id + '-txtFHasta',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 130,
                            labelWidth: 30
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFacturado',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Indicator',
                            width: 170,
                            labelWidth: 70,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Source',
                            width: 120,
                            labelWidth: 40,
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
                            width: 145,
                            labelWidth: 45,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 2
                                    //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBanco',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Bank',
                            width: 140,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
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
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatus',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Status',
                            width: 150,
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
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Ticket',
                            width: 150,
                            labelWidth: 50,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 13,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtInvoice',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: 'Invoice Period (YYYYMM)',
                            width: 200,
                            labelWidth: 140,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 6,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPeriod',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 90,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        }
                    ]
                }

            ]
        }
    ]
});



