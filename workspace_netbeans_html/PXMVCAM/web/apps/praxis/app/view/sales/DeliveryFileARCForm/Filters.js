/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.DeliveryFileARCForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
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
                    id: prototype.id + '-panelFilters',
                    border: false,
//                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 5px 4px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBanco',
                            required: true,                            
                            fieldLabel: 'Bank',
                            width: 130,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'Enter Scheduled Output Date',
                            anchor: '100%',
                            id: prototype.id + '-txtCampo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 260,
                            labelWidth: 170
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCampo2',
                            required: true,
                            readOnly: true,
                            fieldLabel: 'Processing Period Ending Date',
                            width: 250,
                            labelWidth: 170,
                            labelAlign: 'left'
                        }
                    ]
                }

            ]
        }
    ]
});



