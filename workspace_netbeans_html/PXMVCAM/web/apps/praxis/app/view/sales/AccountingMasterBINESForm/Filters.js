/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterBINESForm.Filters', {
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
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Search By',
                    style: 'font-weight:bold;',
                    padding: '10 5 5 5'

                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSearchBy',
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
                    labelWidth: 0,
                    width: 100

                }, {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtPreffix',
                    labelAlign: 'left',
                    fieldLabel: 'Prefix',
                    labelWidth: 50,
                    width: 170,
                    maxLength: 10,
                    enforceMaxLength: true
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboBank',
                    fieldLabel: 'Bank',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: false,
                    valueField: 'A1830BANCO',
                    displayField: 'A1830BANCO',
                    labelWidth: 40,
                    width: 350
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboNature',
                    fieldLabel: 'Nature',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 50,
                    width: 150
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboBrand',
                    fieldLabel: 'Brand',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 50,
                    width: 150
                }
            ]
        }
    ]
});

