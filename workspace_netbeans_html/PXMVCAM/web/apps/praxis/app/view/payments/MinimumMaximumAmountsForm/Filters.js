Ext.define('Ext.Praxis.view.payments.MinimumMaximumAmountsForm.Filters', {
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
                
                
//                {
//                    xtype: 'label',
//                    text: 'Country:',
////                    padding: '3 0 0 30 ',
//                    width: 30
//                },
//                
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbCountry',
//                    queryMode: 'local',
//                    allowBlank: false,
//                    forceSelection: true,
//                    selectOnFocus: true,
//                    caseSensitive: false,
//                    autoSelect: true,
//                    editable: true,
//                    width: 219,
//                    typeAhead: true,
//                    valueField: 'A006PAIS',
//                    displayField: 'A006NOMBRE',
//                    listConfig: {maxHeight: 111},
//                    enableKeyEvents: true,
//                    triggerAction: 'all',
//                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country ',
                    id: prototype.id+'-cmbCountry',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
//                    maskRe: /[0-9]/,
//                    maxLength:10,
                    queryMode: 'local',
                    labelWidth: 100,
                    width: 280,
                    hidden: false,
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    hiddenLabel: false,
//                    listeners:{
//                        keypress: 'eventKey'
//                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Currency ',
                    id: prototype.id+'-txtSCURRENCY',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true, 
//                    maskRe: /[A-Z]/,
//                    maskRe: /[0-9]/,
                    maxLength:3,
                    labelWidth: 100,
                    width: 190,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                       
                    }
                },
                
            ]
            
            
        }
    ]
});



