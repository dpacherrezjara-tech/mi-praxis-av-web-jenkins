Ext.define('Ext.Praxis.view.salesaudit.IvaForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 9},
                                {
                                    xtype: 'label',
                                    text: 'Cod.Country:',
                                    style: 'font-weight:bold;',
                                    width: 95,
                                    padding: '8 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCampo',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    width: 70,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 9},
                                {
                                    xtype: 'label',
                                    text: 'IVA Type:',
                                    style: 'font-weight:bold;',
                                    width: 90,
                                    padding: '8 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbType',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["V", "SALE"], ["C", "COMMISSION"], ["X", "ADMIN. CHARGES"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 120,
                                    enableKeyEvents: true,
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        }
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