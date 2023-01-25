Ext.define('Ext.Praxis.view.sales.CalendarControlBSPForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        padding: '6px 1px 6px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Country:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFilterCountry',
                                    fieldStyle: 'text-align:center;',
                                    maxLength: 2,
                                    enforceMaxLength: true,
                                    value: 'XX',
                                    selectOnFocus: true,
                                    enableKeyEvents: true,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 12},
                                {
                                    xtype: 'label',
                                    text: 'Date:',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFilterDate',
                                    fieldStyle: 'text-align:center;',
                                    maxLength: 4,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    value: '9999',
                                    enableKeyEvents: true,
                                    width: 50,
                                    listeners: {
                                        keypress: 'onTextKeypress'
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