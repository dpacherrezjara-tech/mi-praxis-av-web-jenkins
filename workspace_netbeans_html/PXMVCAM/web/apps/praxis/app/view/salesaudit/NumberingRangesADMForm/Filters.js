Ext.define('Ext.Praxis.view.salesaudit.NumberingRangesADMForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id+'-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1200,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Country:',
                            padding: '4 0',
                            width: 74
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCampo',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z]/,
                            width: 85,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



