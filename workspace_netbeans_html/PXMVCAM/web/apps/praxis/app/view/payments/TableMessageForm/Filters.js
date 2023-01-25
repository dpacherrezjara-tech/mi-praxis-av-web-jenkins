Ext.define('Ext.Praxis.view.payments.TableMessageForm.Filters', {
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
                    fieldLabel: 'Code Message:',
                    id: prototype.id+'-txtCODEM',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
                    maskRe: /[0-9]/,
                    maxLength:10,
                    labelWidth: 100,
                    width: 190,
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



