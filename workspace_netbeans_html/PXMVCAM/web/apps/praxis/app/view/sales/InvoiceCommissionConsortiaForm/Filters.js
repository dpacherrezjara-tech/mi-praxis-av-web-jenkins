/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.Filters', {
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
                sanchor: '100%'

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
                    //style: 'border-bottom: 8px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Search By</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-Cmb_TypeFilter',
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
                            width: 120,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCodIATA',
                            required: true,
                            editable: true,
                            fieldLabel: 'Code IATA',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 20,
                            width: 160,
                            labelWidth: 80,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id: prototype.id + '-txtA1757FFACT',
                            fieldStyle: 'text-align:center',
                            fieldLabel: 'Date Invoice',
                            maskRe: /[0-9/]/,
                            maxLength: 10,
                            enforceMaxLength: true,
                            width: 180,
                            labelWidth: 90
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1757LOTE',
                            required: true,
                            editable: true,
                            fieldLabel: 'Lote',
                            enableKeyEvents: true,
                            width: 180,
                            labelWidth: 60,
                            maxLength: 20,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        }
                    ]
                }

            ]
        }
    ]
});

