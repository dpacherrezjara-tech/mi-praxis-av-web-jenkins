/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.LogBSPJpForm.Filters', {
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
                width: 1300
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
                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
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
                            fieldLabel: '<b>From</b>',
                            anchor: '100%',
                            id: prototype.id + '-txtFDesde',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 60
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: '<b>To</b>',
                            anchor: '100%',
                            id: prototype.id + '-txtFHasta',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCountry',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '<b>Country</b>',
                            width: 120,
                            labelWidth: 70,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCurrency',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '<b>Currency</b>',
                            width: 130,
                            labelWidth: 70,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/
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
                        padding: '8px 7px 8px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFare',
                            required: true,
                            readOnly: true,
                            fieldLabel: 'Fare Reported',
                            width: 220,
                            labelWidth: 110,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: right;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtComm',
                            required: true,
                            readOnly: true,
                            fieldLabel: 'Commission Reported',
                            width: 250,
                            labelWidth: 140,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: right;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFareAdj',
                            required: true,
                            readOnly: true,
                            fieldLabel: 'Fare Adjustment',
                            width: 230,
                            labelWidth: 120,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: right;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCommAdj',
                            required: true,
                            readOnly: true,
                            fieldLabel: 'Commission Adjustment',
                            width: 270,
                            labelWidth: 160,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: right;',
                            labelAlign: 'left'
                        }
                    ]
                }
            ]
        }
    ]
});



