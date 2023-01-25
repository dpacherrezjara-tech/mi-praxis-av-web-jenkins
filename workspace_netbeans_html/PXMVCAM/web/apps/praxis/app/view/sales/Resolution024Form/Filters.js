/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.Resolution024Form.Filters', {
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

                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCountry',                  
                    labelAlign: 'right',
                    labelWidth: 0,
                    width: 80,
                    maxLength: 2,
                    enforceMaxLength: true
                    
                },              
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCurrency',                  
                    labelAlign: 'right',
                    labelWidth: 0,
                    width: 80,
                    maxLength: 3,
                    enforceMaxLength: true
                    
                },
                
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Flight Date</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable:false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'                    
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    width: 70,
                    anchor: '100%'
                },                
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    width: 70,
                    anchor: '100%'
                }
                

            ]
        }
    ]
});

