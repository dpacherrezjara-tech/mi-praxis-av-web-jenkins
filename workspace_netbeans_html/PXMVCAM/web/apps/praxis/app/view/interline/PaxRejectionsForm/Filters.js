Ext.define('Ext.Praxis.view.interline.PaxRejectionsForm.Filters', {
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Invoice Date:',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 20},
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
                                {xtype: 'tbspacer', width: 4},
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
                                {xtype: 'tbspacer', width: 36},
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
                                {xtype: 'tbspacer', width: 4},
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
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 120},
//                                {
//                                    xtype: 'label',
//                                    html: 'Status',
//                                    padding: '8px 7px 8px 0px',
//                                    width: 90
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cmbStatus',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            ["", "All"], ["0", "Closed"], ["1", "Process"]
//                                        ]
//                                    }),
//                                    queryMode: 'local',
//                                    triggerAction: 'all',
//                                    autoSelect: false,
//                                    forceSelection: true,
//                                    caseSensitive: false,
//                                    editable: true,
//                                    typeAhead: true,
//                                    valueField: 'code', displayField: 'name',
//                                    width: 90,
//                                    enableKeyEvents: true,
//                                    listeners: {
//                                        afterrender: function (combo, eOpts) {
//                                            combo.setValue("");
//                                        },
////                                        focus: function(combo) {
////                                            combo.expand();
////                                        }
//                                    }
//                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 2},
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
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    html: 'Source Code:',
                                    padding: '8px 7px 8px 0px',
                                    width: 104
                                },
                                {xtype: 'tbspacer', width: 4},
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
                                    valueField: 'CODSOUR', displayField: 'DESSOU',
                                    listConfig: {maxHeight: 111, minWidth: 320},
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
                                    html: 'Billing Airline:',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAerolinea',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'A005KEY', displayField: 'A005KEY2',
                                    listConfig: {maxHeight: 111, minWidth: 300},
                                    width: 218,
                                    enableKeyEvents: true,
//                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
//                                    }
                                },
                                {xtype: 'tbspacer', width: 50},
//                                {
//                                    xtype: 'label',
//                                    text: 'Group Cod: ',
//                                    padding: '8px 7px 8px 0px',
//                                    width: 110
//                                },
//                                {
//                                    xtype: 'combo',
//                                    id: prototype.id + '-cmbTypeDoc',
//                                    store: new Ext.data.SimpleStore({
//                                        fields: ['code', 'name'],
//                                        data: [
//                                            ["", "All"], ["1", "Prime Source Code"], ["2", "Rejections Coupons"], ["3", "Rejections FIM's"], ["4", "Rejections Frequent Flyer "],
//                                            ["5", "Billing Memo's"], ["6", "Sampling Related"], ["7", "Credit Memo"], ["8", "Optional Codes Bilateral"]
//                                        ]
//                                    }),
//                                    queryMode: 'local',
//                                    allowBlank: true,
//                                    autoSelect: true,
//                                    forceSelection: true,
//                                    selectOnFocus: true,
//                                    caseSensitive: false,
//                                    editable: true,
//                                    width: 130,
//                                    typeAhead: true,
//                                    valueField: 'code', displayField: 'name',
//                                    listConfig: {maxHeight: 111, minWidth: 170},
//                                    enableKeyEvents: true,
//                                    triggerAction: 'all',
//                                    listeners: {
//                                        afterrender: function (combo, eOpts) {
//                                            combo.setValue("");
//                                        },
////                                        focus: function(combo) {
////                                            combo.expand();
////                                        }
////                                        ,
////                                        change: 'CargarSourceCode',
//                                    }
//                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Period:',
                                    padding: '8px 7px 8px 0px',
                                    width: 58
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPeriod',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["01", "01"], ["02", "02"], ["03", "03"], ["04", "04"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 80,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function(combo, eOpts) {
                                            combo.setValue("");
                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFindBy',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["TICKET", "Ticket"], ["REJ", "Reject"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    value: "",
                                    fieldLabel: 'Search by ',
                                    labelWidth: 111,
                                    labelAlign: 'right',
                                    width: 184,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'cmbFind_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 33},
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblTkt',
                                    text: '',
                                    width: 1,
                                    hidden: true,
                                    padding: '10 0 0 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTKT',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
//                            maxLength: 13,
                                    maskRe: /[0-9]/,
                                    width: 150,
                                    hidden: true,
                                    listeners: {
                                        change: 'onValidarChange',
                                        keypress: 'BuscarTKT_keyDownHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblRej',
                                    text: '',
                                    width: 110,
                                    hidden: true,
                                    padding: '10 0 0 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtRej',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    //maxLength: 10,
                                    hidden: true,
                                    width: 140,
                                    listeners: {
                                        keypress: 'searchRejection'
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});