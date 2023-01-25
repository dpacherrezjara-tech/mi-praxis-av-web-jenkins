/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PaymentNotificationReportForm.Filters', {
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
//                            html: '<strong style="color:#000;">Search By</strong>',
//                            align: 'right',
//                            fieldStyle: 'text-align: left;',
//                            padding: '11px 7px 8px 10px'
//                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIATA',
                            required: true,
                            editable: true,
                            fieldLabel: 'Search By IATA',
                            enforceMaxLength: true,
                            maxLength: 9,
                            width: 180,
                            labelWidth: 100,                            
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRefCode',
                            required: true,
                            editable: true,
                            fieldLabel: 'Reference Code',
                            enforceMaxLength: true,
                            maxLength: 14,
                            width: 220,
                            labelWidth: 120,                            
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtBatchID',
                            required: true,
                            editable: true,
                            //enforceMaxLength: true,
                            //maxLength: 1,
                            fieldLabel: 'Batch ID',
                            width: 180,
                            labelWidth: 80,
                            //maskRe: /[1-4]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: '<b>Date</b>',
                            anchor: '100%',
                            id: prototype.id + '-txtPDate',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40                            
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cboStatus',
                            fieldLabel: 'Status',
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
                            labelWidth: 60,
                            width: 160,
                            anchor: '100%'
                        }

                    ]
                }

            ]
        }
    ]
});

