/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ProgressCorrectionvalidationForm.Filters', {
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
                anchor: '100%'
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
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By',
                            align: 'left',
                            style: 'font-weight:bold',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            align: 'center',
                            style: 'font-weight:bold;color:red',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTypeDate',
                            fieldLabel: '',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 0,
                            width: 120,
                            anchor: '100%'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            anchor: '100%',
                            id: prototype.id + '-txtTypeOfDate_00',
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
                            labelAlign: 'right',
                            labelWidth: 20,
                            anchor: '100%',
                            id: prototype.id + '-txtTypeOfDate_01',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 130                            
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSource',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Source',
                            labelAlign: 'right',
                            labelWidth: 50, 
                            width: 160,                                                       
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgCtlStpro',
                            fieldLabel: 'Status',
                            labelStyle: 'text-align: right;font-weight:bold',
                            horizontal: true,
                            items: [
                                {boxLabel: 'Close', name: 'rb', inputValue: '1', width: 60},
                                {boxLabel: 'Open', name: 'rb', inputValue: '0', width: 60},
                                {boxLabel: 'Accounting', name: 'rb', inputValue: '2', width: 90},
                                {boxLabel: 'Not Accounting', name: 'rb', inputValue: '3', width: 110},
                                {boxLabel: 'All', name: 'rb', inputValue: '', width: 80, checked: true}
                            ]
                        }
                    ]
                }

            ]
        }
    ]
});

