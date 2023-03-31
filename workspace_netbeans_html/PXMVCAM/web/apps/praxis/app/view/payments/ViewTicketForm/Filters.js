/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.payments.ViewTicketForm.Filters', {
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
                            value: '134',
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
                    ]
                },
                
            ]
        }
    ]
});

