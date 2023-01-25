Ext.define('Ext.Praxis.view.sales.InterlineAnalysisForm.Filters', {
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
                        padding: '1px 1px 1px 1px',
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
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    fieldLabel: 'Year',
                                    labelAlign: 'right',
                                    labelWidth: 35,
                                    width: 100,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 8
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-graph',
                                    text: 'Graph',
                                    iconCls: 'prx-icon-graph-pie',
                                    enableToggle: true,
                                    listeners: {
                                        click: 'onGraphClick'
                                        //toggle: 'onStateToggle'
                                    }
                                },
//                                {
//                                    xtype: 'fieldset',
//                                    padding: '2 5 2 1',
//                                    layout: {
//                                        type: 'hbox'
//                                    },
//                                    border: true,
//                                    items: [
//                                        {
//                                            xtype: 'radiogroup',
//                                            id: prototype.id + '-rbtnGroupBy',
//                                            enableKeyEvents: true,
//                                            listeners: {
//                                                change: 'Onsearch'
//                                            },
//                                            items: [
//                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">Grid</label>', inputValue: '1', name: 'rbtnGroupBy', checked: true, width: 70},
//                                                {boxLabel: '<label style="color:#142E7A;font-weight:bold;">Graph</label>', inputValue: '2', name: 'rbtnGroupBy', width: 85}
//                                            ]
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 8
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'OAL Only',
                                    id: prototype.id + '-chk-oal',
                                    hidden: true,
                                    checked: false,
                                    listeners: {
                                        change: 'onChkOalChange'
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    id: prototype.id + '-txt-diff',
                                    hidden: true,
                                    hideTrigger: true,
                                    fieldLabel: 'Diff >',
                                    separator: '',
                                    width: 90,
                                    labelWidth: 50,
                                    maxLength: 3,
                                    maxValue: 100,
                                    minValue: 0,
                                    labelAlign: 'right',
                                    fieldStyle: 'text-align: right;',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onDiffKeypress'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lbl-diff',
                                    hidden: true,
                                    text: '%',
                                    separator: ''
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txt-carrier',
                                    fieldLabel: 'Carrier',
                                    width: 90,
                                    labelWidth: 55,
                                    labelAlign: 'right',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    enableKeyEvents: true,
                                    hidden: true,
                                    listeners: {
                                        change: 'onCarrChange',
                                        keypress: 'onCarrKeypress'
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