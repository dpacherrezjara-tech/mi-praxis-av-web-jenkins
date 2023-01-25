Ext.define('Ext.Praxis.view.sales.InplantCommissionsForm.Filters', {
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
                                    style: 'font-weight:bold;',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 17},
                                // <editor-fold defaultstate="collapsed" desc="cmbOpcion">
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbOpcion',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["TKT", "Ticket Number"], ["NLOTE", "Batch ID"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 120,
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
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onCmbOpcionChange'
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCampo',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /[0-9]/,
                                    hidden: true,
                                    width: 150,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtIdLote',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    maskRe: /[0-9]/,
                                    hidden: true,
                                    width: 100,
                                    listeners: {
                                        keypress: 'onTextKeypress'
                                    }
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