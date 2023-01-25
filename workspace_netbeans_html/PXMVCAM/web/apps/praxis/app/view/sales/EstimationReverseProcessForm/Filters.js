Ext.define('Ext.Praxis.view.sales.EstimationReverseProcessForm.Filters', {
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
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6px 7px 4px 0px'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Search By: ',
                                    style: 'font-weight:bold;',
                                    padding: '9px 7px 0px 0px'
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    fieldLabel: 'Account Date:',
                                    anchor: '100%',
                                    id: prototype.id + '-txtDate',
                                    fieldStyle: 'text-align:center',
                                    maskRe: /[0-9/]/,
                                    enforceMaxLength: true,
                                    width: 220,
                                    labelWidth: 80,
                                    padding: '6px 10px 4px 10px'
                                },                                
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxSource',
                                    fieldLabel: 'Source ',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 50,
                                    width: 150,
                                    //anchor: '100%',
                                    padding: '6px 10px 4px 10px',
                                    listeners: {
                                        focus: function(combo) {
                                            //combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCountry',
                                    fieldLabel: 'Country ',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    //maskRe: /[0-9]/,
                                    labelWidth: 50,
                                    width: 100,
                                    padding: '6px 10px 4px 10px',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDistChanel',
                                    fieldLabel: 'Distrib. Channel ',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    //maskRe: /[0-9]/,
                                    labelWidth: 95,
                                    width: 150,
                                    padding: '6px 10px 4px 10px',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                                /*
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblSource0',
                                    style: 'text-align:right;',
                                    text: 'Clearence period',
                                    width: 139,
                                    padding: '9px 7px 0px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 70,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth',
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
                                    listeners: {
                                        focus: function(combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtPeriodo',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    width: 28,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblSource',
                                    style: 'text-align:right;',
                                    text: 'Source',
                                    width: 63,
                                    padding: '9px 7px 0px 0px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxSource',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["IP", "IxP"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 50,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("IP");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                //*/
                                
                                /*
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblCountry',
                                            html: 'Country ',
                                            hidden: true,
                                            padding: '4px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCountry',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: 2,
                                            width: 50,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblChannel',
                                            html: 'Distrib. Channel ',
                                            hidden: true,
                                            padding: '4px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtChannel',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: 3,
                                            width: 50,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                }
                                //*/
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});