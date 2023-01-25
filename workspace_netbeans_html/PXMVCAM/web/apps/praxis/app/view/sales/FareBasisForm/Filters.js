/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FareBasisForm.Filters', {
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
                    xtype: 'combo',
                    id: prototype.id + '-cmbSearchType',
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
                    emptyText: 'All',
                    labelWidth: 80,
                    width: 220,
                    anchor: '100%'
                },
                 {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCampo',                  
                    labelAlign: 'left',
                    fieldLabel: '',
                    labelWidth: 0,
                    width: 80,
                    maxLength: 3,
                    enforceMaxLength: true                    
                } ,
                 {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCamp2',                  
                    labelAlign: 'left',
                    fieldLabel: '',
                    labelWidth: 0,
                    width: 120,
                    maxLength: 15,
                    enforceMaxLength: true                    
                }      
               

            ]
        }
    ]
});

