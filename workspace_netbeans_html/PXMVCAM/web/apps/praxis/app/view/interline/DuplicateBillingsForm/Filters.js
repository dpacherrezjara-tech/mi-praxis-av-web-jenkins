Ext.define('Ext.Praxis.view.interline.DuplicateBillingsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: false,
    margin: '2 0',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: 1340,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxSearchFilter',
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
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbFecha',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            [1, "Clearing Date"], [2, "Invoice Date"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 135,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue(1);
                                        },
//                                        focus: function (combo) {
//                                            combo.expand();
//                                        },
                                        change: 'changeTipoFecha'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px',
                                    width: 45
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateFromDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    hidden: true,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px',
                                    width: 31
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbDateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: true,
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    width: 65,
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                //</editor-fold>
                                {
                                    xtype: 'label',
                                    text: 'Source Code : ',
                                    style: 'text-align:right;',
                                    padding: '8px 7px 8px 0px',
                                    width: 104
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSourceCode',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 300},
                                    width: 220,
                                    enableKeyEvents: true,
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Period:',
                                    padding: '8px 7px 8px 0px',
                                    width: 58
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtPeriod',
                                    fieldStyle: 'text-align:center;',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    width: 50,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'txtPeriod_keyDownHandler'
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