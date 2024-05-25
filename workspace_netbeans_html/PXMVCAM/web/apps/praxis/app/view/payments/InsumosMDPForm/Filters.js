Ext.define('Ext.Praxis.view.payments.InsumosMDPForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
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
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                
                {
                    xtype: 'textfield',
                    fieldLabel: 'Aplication:',
                    id: prototype.id+'-txtAPLIC',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength:10,
                    labelWidth: 100,
                    width: 250,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Input Name:',
                    id: prototype.id+'-txtINPNAME',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
//                    maskRe: /[0-9a-zA-Z]/,
                    maxLength:30,
                    labelWidth: 100,
                    width: 300,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Output Name:',
                    id: prototype.id+'-txtOUTNAME',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength:10,
                    labelWidth: 100,
                    width: 250,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Table:',
                    id: prototype.id+'-txtTABLA',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength:10,
                    labelWidth: 100,
                    width: 250,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                    }
                }
                
            ]
            
            
        }
    ]
});



