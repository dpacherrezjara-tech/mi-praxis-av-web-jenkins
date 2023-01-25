/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CatalogueFlightForm.Filters', {
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
                padding: '5px 1px 5px 5px',
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
                    id: prototype.id + '-cmbSearchType',
                    fieldLabel: 'Type',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',                    
                    labelWidth: 45,
                    width: 150

                }
                , {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtNFLIGHT',
                    fieldLabel: '<strong style="color:#000;">Flight Number</strong>',
                    labelAlign: 'right',
                    labelWidth: 110,
                    width: 170,
                    maxLength: 4,
                    enforceMaxLength: true,
                    maskRe:/[0-9]/
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCARRIER',
                    fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                    labelAlign: 'right',
                    labelWidth: 70,
                    width: 130,
                    maxLength: 2,
                    enforceMaxLength: true,
                    maskRe:/[a-zA-Z]/
                }

            ]
        }
    ]
});

