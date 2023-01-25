/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AverageFareEMDForm.Filters', {
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
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSearchBy',
                    fieldLabel: 'Search By',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    value: 'SubCode',
                    labelWidth: 70,
                    width: 170

                }
                , {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-textCode',
                    fieldLabel: '<strong style="color:#000;">Sub Code</strong>',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width: 150,
                    maxLength: 3,
                    enforceMaxLength: true
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-textRfic',
                    fieldLabel: '<strong style="color:#000;">RFIC</strong>',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width: 150,
                    maxLength: 1,
                    enforceMaxLength: true,
                    hidden: true
                }

            ]
        }
    ]
});

