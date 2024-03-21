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
//                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    strong: true,
                    html: '<strong>Merchant :</strong>',
                    padding: '7 0 0 20',
                    width: 87,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 10,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    strong: true,
                    html: '<strong>Branch Merchant :</strong>',
                    padding: '7 0 0 20',
                    width: 140,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtBMERCHAN',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 10,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'label',
                    html: '<strong>Cta Bank :</strong>',
                    padding: '7 0 0 20',
                    width: 87,
                    hidden: true,
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCTABANK',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 15,
                    hidden: true,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Credit Card Code',
                    id: prototype.id+'-cmbScarCode', 
                    disabled: false,
                    width: 300,
                    labelWidth: 120,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODE',
                    displayField: 'NAME',
                    hidden: false,
                    hiddenLabel: false,
                    listeners: {
                        keypress: 'buscarFilter'
                    }
                }
                
                
            ]
        }
    ]
});



