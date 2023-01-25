Ext.define('Ext.Praxis.view.plm.MasterClassificationsForm.Filters', {
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
                            text: 'Search By: ',
                            padding: '4 0',
                            style: 'font-weight:bold;',
                            width: 74
                        },
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-HBox_Option01',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    padding: '4 3 4 0',
                                    style: 'text-align: right;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCode',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 62,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});



