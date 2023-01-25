/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ProvisosTextForm.Filters', {
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
                , {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAairline',
                    fieldLabel: '<strong style="color:#000;">Airline</strong>',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 150,
                    maxLength: 2,
                    enforceMaxLength: true
                    
                },              
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtValidForm',
                    fieldLabel: '<strong style="color:#000;">Valid Form</strong>',
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 150,
                    maxLength: 4,
                    enforceMaxLength: true
                    
                }

            ]
        }
    ]
});

