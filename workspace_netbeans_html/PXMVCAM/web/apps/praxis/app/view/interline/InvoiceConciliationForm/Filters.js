/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.InvoiceConciliationForm.Filters', {
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
                width: 1000
            },
            items: [
                /**
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    style: 'border-bottom: 2px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Billing Date',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'From',
                            width: 110,
                            labelWidth: 40,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'To',
                            width: 100,
                            labelWidth: 30,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPeriod',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'Period',
                            width: 130,
                            labelWidth: 60,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbAerolinea',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'Type Airline',
                            width: 220,
                            labelWidth: 80,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        }
                    ]
                }
//                {
//                    xtype: 'panel',
//                    bodyStyle: 'background: transparent',
//                    id: prototype.id + '-panelFilters2',
//                    border: false,
//                    layout: 'column',
//                    defaults: {
//                        // labelStyle: 'font-weight:bold;',
//                        fieldStyle: 'text-align: center;',
//                        padding: '8px 7px 8px 10px',
//                        anchor: '100%'
//                    },
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Ticket',
//                            width: 55,
//                            style: 'font-weight:bold;',
//                            padding: '10 5 5 5'
//
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id + '-txtTKT',
//                            required: true,
//                            readOnly: false,
//                            fieldLabel: '',
//                            width: 120,
//                            labelWidth: 0,
//                            fieldStyle: 'text-align: center;',
//                            labelAlign: 'left',
//                            maxLength: 13,
//                            enforceMaxLength: true,
//                            maskRe: /[0-9]/
//                        }
//
//                    ]
//                }
            ]
        }
    ]
});



