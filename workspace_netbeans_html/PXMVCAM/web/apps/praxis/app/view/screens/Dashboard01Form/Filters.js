Ext.define('Ext.Praxis.view.screens.Dashboard01Form.Filters', {
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
                    id: prototype.id + '-SalesAnalysis_filter',
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
                                    html: '<strong style="color:#000;">Select By : </strong>',
                                    id: prototype.id + '-lblSelec',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
//                                    width: 120,
                                    padding: '8px 0px 0px 5px',
                                    hidden: false
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSelectBy',
                                    fieldStyle: 'text-align:left;',
                                    padding: '5px 20px 0px 0px',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
//                                    emptyText: 'Reception Date',
                                    labelWidth: 100,
                                    width: 140,
                                    listeners: {
                                        change: 'imgSearch_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
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
                                    editable: false,
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
                                    editable: false,
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
                                {xtype: 'tbspacer', width: 4},
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
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    hidden: true,
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
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
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
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
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
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                // </editor-fold>                               
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Top:',
                                    id: prototype.id + '-lblTop',
                                    hidden: true,
                                    padding: '8px 20px 0px 5px',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTop',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
//                                    listConfig: {maxHeight: 111},
                                    width: 60,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    id: prototype.id + '-cmbPais',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    emptyText: 'All',
                                    labelWidth: 55,
                                    width: 270,
                                    anchor: '100%'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkRN',
                                    width: 130,
                                    boxLabel: 'NR Analisys',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'btnSearch_click'
                                    }
                                },
                                {xtype: 'tbspacer', width: 2},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Transaction',
                                    id: prototype.id + '-cmbTran',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'center',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 74,
                                    width: 150,
                                    anchor: '100%'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-FlownAnalysis_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
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
                                    html: '<strong style="color:#000;">Select By : </strong>',
                                    //id: prototype.id + '-lblFASelec',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
//                                    width: 120,
                                    padding: '8px 0px 0px 5px',
                                    hidden: false
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFASelectBy',
                                    fieldStyle: 'text-align:left;',
                                    padding: '5px 20px 0px 0px',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
//                                    emptyText: 'Reception Date',
                                    labelWidth: 100,
                                    width: 140,
                                    listeners: {
                                        change: 'imgSearchFA_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function (combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    //forceSelection: true,
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
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateFromDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    hidden: true,
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
                                    id: prototype.id + '-cmbFADateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    //forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFADateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    //forceSelection: true,
                                    caseSensitive: false,
                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Top:',
                                    //id: prototype.id + '-lblFATop',
                                    hidden: true,
                                    padding: '8px 20px 0px 5px',
                                    width: 30
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFATop',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    hidden: true,
//                                    listConfig: {maxHeight: 111},
                                    width: 60,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    id: prototype.id + '-cmbFAPais',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    readOnly: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    emptyText: 'All',
                                    labelWidth: 55,
                                    width: 270,
                                    anchor: '100%'
                                },
                                {xtype: 'tbspacer', width: 20},
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrInterline_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
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
                                {xtype: 'tbspacer', width: 100},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Billing Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    editable: false,
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_INT',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                }
                                // </editor-fold>
                                ,
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Periodo:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPERNUM_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Airline:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAirline_INT',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'A005KEY', displayField: 'A005KEY2',
                                    width: 200,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-cbCollection',
                                    margin: '8 0 0 30',
                                    labelStyle: 'color:#378BCC;',
                                    width: 100,
                                    boxLabel: 'Collection',
                                    inputValue: '1'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrEMD_filter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    hidden: true,
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDate',
//                                    fieldLabel: 'Source Code',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'Sale Date',
                                    labelWidth: 100,
                                    width: 120,
                                    anchor: '100%',
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    editable: false,
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth_EMD',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDay_EMD',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
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
                                    id: prototype.id + '-cmbDateToYear_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDay_EMD',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
                                    }
                                }
                                // </editor-fold>

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-ScrExpired_filter',
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
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 30px 0px 5px',
                                    hidden: false
                                },
//                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
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
                                    id: prototype.id + '-cmbDateFromMonth_EXP',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
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
                                {xtype: 'tbspacer', width: 4},
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
                                    id: prototype.id + '-cmbDateToYear_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth_EXP',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Country',
                                    id: prototype.id + '-cmbCountry_EXP',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    hidden: false,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    emptyText: 'All',
                                    labelWidth: 55,
                                    width: 270,
                                    anchor: '100%'
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});