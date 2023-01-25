Ext.define('Ext.Praxis.view.interline.SPAReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0 2 0 ',
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
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Reception Date ',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 15},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
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
                                    id: prototype.id + '-cmbDateFromMonth',
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
                                    id: prototype.id + '-cmbDateFromDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    hidden: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
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
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
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
                                    id: prototype.id + '-cmbDateToMonth',
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
                                    id: prototype.id + '-cmbDateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    hidden: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 26},
//                                {
//                                    xtype: 'label',
//                                    html: 'Status',
//                                    padding: '8px 7px 8px 0px'
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cmbStatus',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            ["", "All"], ["C", "Certified"], ["P", "Test"], ["D", "Development"], ["U", "Upgrade"], ["R", "Register"]
//                                        ]
//                                    }),
//                                    queryMode: 'local',
//                                    forceSelection: true,
//                                    selectOnFocus: true,
//                                    caseSensitive: false,
//                                    autoSelect: true,
//                                    editable: true,
//                                    width: 135,
//                                    typeAhead: true,
//                                    valueField: 'code', displayField: 'name',
//                                    listConfig: {maxHeight: 111},
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    listeners: {
//                                        afterrender: function(combo, eOpts) {
//                                            combo.setValue("");
//                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
//                                },
                                {xtype: 'tbspacer', width: 10},
//                                {
//                                    xtype: 'checkboxfield',
//                                    id: prototype.id + '-chkVigentes',
//                                    boxLabel: '<b>Vigentes</b>',
//                                    checked: false,
//                                    width: 80,
//                                    listeners: {
//                                        change: 'imgSearch_clickHandler'
//                                    }
//                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Billing Airline',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAerolinea',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 260,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        select: 'imgSearch_clickHandler'
//                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 33},
                                {
                                    xtype: 'label',
                                    html: 'Indicator',
                                    padding: '8px 7px 8px 0px',
                                    hidden: true
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbIndicator',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["S", "SPA"], ["C", "CHARGES"], ["F", "FIMS"], ["G", "GSA"], ["I", "ISC"],
                                            ["M", "MEXIPASS"], ["Q", "FRECUENTA"], ["U", "UATP"], ["Z", "ZED"], ["V", "INV"]
                                        ]
                                    }),
                                    hidden: true,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 135,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("");
                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
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