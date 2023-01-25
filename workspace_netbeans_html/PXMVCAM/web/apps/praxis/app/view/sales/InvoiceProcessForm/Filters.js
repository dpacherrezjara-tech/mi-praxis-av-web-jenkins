/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.InvoiceProcessForm.Filters', {
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
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        //fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Module </strong><strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cboModulo',
                            required: true,
                            fieldLabel: '',
                            width: 150,
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
                            fieldLabel: '<b>Date From </b>',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 180,
                            labelWidth: 80
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: '<b>To </b>',                           
                            anchor: '100%',
                            id: prototype.id + '-txtDateTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cboEstado',
                            required: true,
                            fieldLabel: 'Status',
                            width: 160,
                            labelWidth: 70,
                            labelAlign: 'right',
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

