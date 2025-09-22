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
                                {xtype: 'tbspacer', width: 10},
                                {
                                    fieldLabel: 'Type Calendar',
                                    xtype: 'combo',
                                    width: 200,
                                    labelWidth: 95,
                                    style: 'margin-right:10px;',
                                    hidden: false,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                    disabled: false,
                                    id: prototype.id + '-typeCalendar',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: 'BLOCL',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'BICCS', name: 'ICCS BSP'},
                                            {code: 'BLOCL', name: 'BSP LOCAL'},
                                            {code: 'CLOCAL', name: 'CASS LOCAL'},
                                            {code: 'ICASS', name: 'ICCS-CASS'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
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
                                },

                                ///AGREGAMOS BOTON PARA CARGA DE ARCHIVO Y SUBIDA


                                ///AQUI TERMINA


                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
