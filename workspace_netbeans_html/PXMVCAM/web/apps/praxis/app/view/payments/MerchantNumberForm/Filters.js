Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.Filters', {
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
                    xtype: 'combo',
                    id: prototype.id+'-cmbFindBy',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 120,
                    width: 120,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        change: 'cmbFind_changeHandler'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id+'-txtMERCHN',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,    
                    enforceMaxLength: true,
                    maxLength: 20,
                    maskRe: /[0-9]/,
                    labelWidth: 120,
                    width: 130,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        keypress: 'eventKey'
                    }  
                },
                {
                    xtype: 'textfield',
                    id: prototype.id+'-txtRSOCIAL',                                   
                    enableKeyEvents: true,                    
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,    
                    enforceMaxLength: true,
                    maxLength: 40,
//                    maskRe: /[a-zA-Z]/,
                    labelWidth: 120,
                    width: 190,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'eventKey'
                    }
                },
//                {
//                    xtype: 'label',
//                    text: 'Operative Unit:',
//                    hidden: false,
//                    textAlign: 'center',
//                    paddingLeft: 3,
//                    style: 'font-weight:bold;color:#0B333C;',
//                    width: 120
//                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'combo',
                    fieldLabel: 'Operative Unit:',
                    id: prototype.id + '-cmbUNIOPE',
                    queryMode: 'local',
//                    labelWidth: 120,
                    width: 240,
                    fieldStyle: 'color:#074066;',
                    forceSelection: true,
                    selectOnFocus: false,
                    caseSensitive: false,
                    hidden: false,
                    autoSelect: true,
                    editable: false,
                    disabled: false,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Channel',
                    id: prototype.id+'-txtCANAL',                                   
                    enableKeyEvents: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,    
                    maxLength:4,
                    labelWidth: 120,
                    width: 190,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Status:',
                    id: prototype.id + '-cmbSTATUS',
                    queryMode: 'local',
                    width: 200,
                    fieldStyle: 'color:#074066;',
                    forceSelection: true,
                    selectOnFocus: false,
                    caseSensitive: false,
                    hidden: false,
                    autoSelect: true,
                    editable: false,
                    disabled: false,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country:',
                    id: prototype.id + '-cmbCountry',
                    queryMode: 'local',
                    width: 240,
                    fieldStyle: 'color:#074066;',
                    forceSelection: true,
                    selectOnFocus: false,
                    caseSensitive: false,
                    hidden: false,
                    autoSelect: true,
                    editable: false,
                    disabled: false,
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    enableKeyEvents: true,
                    triggerAction: 'all'
                }
            ]
        }
    ]
});



