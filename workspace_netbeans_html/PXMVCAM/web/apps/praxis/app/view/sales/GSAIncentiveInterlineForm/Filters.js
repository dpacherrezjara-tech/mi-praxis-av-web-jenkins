Ext.define('Ext.Praxis.view.sales.GSAIncentiveInterlineForm.Filters', {
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
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
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
                                    text: 'Search By: ',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbOpcion',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["DFLIGH", "Flight Date"], ["DSALES", "Sale Date"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 100,
                                    typeAhead: true,
                                    emptyText: 'Select',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (cmp, eOpts) {
                                            cmp.setValue("");
                                        },
                                        focus: function(combo) {
                                            combo.expand();
                                        },
                                        blur: function(combo, event, eOpts) {
                                            if (combo.getValue() === null) {
                                                combo.setValue("");
                                            }
                                        },
                                        change: 'onOpcionChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
                                        fieldStyle: 'text-align:center',
                                        enforceMaxLength: true,
                                        enableKeyEvents: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'From:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtFilterFrom',
                                            maxLength: 6,
                                            maskRe: /[a-zA-Z0-9]/,
                                            width: 80,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtFilterTo',
                                            maxLength: 6,
                                            maskRe: /[a-zA-Z0-9]/,
                                            width: 80,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Currency:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtFilterCurrency',
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z0-9]/,
                                            width: 50,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Country:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtFilterCountry',
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z0-9]/,
                                            width: 50,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});