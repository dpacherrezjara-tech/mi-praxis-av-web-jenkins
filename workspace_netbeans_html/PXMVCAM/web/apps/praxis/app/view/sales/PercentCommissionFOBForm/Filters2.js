/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PercentCommissionFOBForm.Filters2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters2',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '1px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 2px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                sanchor: '100%'
            },
            items: [                
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
                            xtype: 'label',
                            html: '<strong style="color:#000;">Search By</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-CbmFilterEx',
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
                            id: prototype.id + '-txtA1874CODEA',
                            required: true,
                            editable: true,
                            fieldLabel: 'Agreement',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 4,
                            width: 160,
                            labelWidth: 80,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1874IATA',
                            required: true,
                            editable: true,
                            fieldLabel: 'Iata',
                            enableKeyEvents: true,
                            width: 160,
                            labelWidth: 60,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        }
                    ]
                }

            ]
        }
    ]
});

