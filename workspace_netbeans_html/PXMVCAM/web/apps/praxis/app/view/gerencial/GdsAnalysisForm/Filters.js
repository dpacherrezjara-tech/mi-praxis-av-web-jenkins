Ext.define('Ext.Praxis.view.gerencial.GdsAnalysisForm.Filters', {
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
                                    xtype: 'panel',
                                    id: prototype.id + '-cont-filter00',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent',
                                        border: false,
                                        padding: '5px'
                                    },
                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-cont-filter-form00',
                                            //title:'-cont-filter-form00',
                                            layout: 'hbox',
                                            defaults: {
                                                padding: '5px 1px 5px 1px'
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
                                                        afterrender: 'setStoreData',
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-sel',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'description'],
                                                        data: [
                                                            ["1", "Date"],
                                                            ["2", "Agent "]
                                                        ]
                                                    }),
                                                    fieldLabel: 'Select By',
                                                    width: 160,
                                                    labelWidth: 75,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'description',
                                                    listeners: {
                                                        change: 'onCmbGroupByChange',
                                                        afterrender: function() {
                                                            Ext.getCmp(prototype.id + '-cmb-sel').setValue('1');
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-filter',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'description'],
                                                        data: [
                                                            ["1", "Agent Name"]
                                                        ]
                                                    }),
                                                    fieldLabel: 'Filter By',
                                                    width: 180,
                                                    labelWidth: 65,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'description',
                                                    hidden: true,
                                                    listConfig: {
                                                        minWidth: 200
                                                    },
                                                    listeners: {
                                                        change: 'onCmbFilterChange',
                                                        afterrender: function(obj) {
                                                            obj.setValue('1');
                                                            Ext.getCmp(prototype.id + '-txt-filter').focus(true);
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txt-filter',
                                                    hideLabel: true,
                                                    width: 300,
                                                    hidden: true,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'onTxtFilterKeypress'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cont-filter01',
                                    //title:'-cont-filter-form01',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: transparent',
                                        border: false,
                                        padding: '5px'
                                    },
                                    hidden: true,
                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-cont-filter-form01',
                                            layout: 'hbox',
                                            defaults: {
                                                padding: '5px 1px 5px 1px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txt-VP_MES-01',
                                                    fieldLabel: 'Period',
                                                    fieldStyle: 'text-align:center;background:#fafafa',
                                                    readOnly: true,
                                                    labelWidth: 70,
                                                    labelAlign: 'right',
                                                    width: 130
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cont-filter02',
                                    //title:'-cont-filter-form02',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        bodyStyle: 'background: transparent',
                                        border: false,
                                        padding: '5px'
                                    },
                                    hidden: true,
                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-cont-filter-form02',
                                            layout: 'hbox',
                                            defaults: {
                                                padding: '5px 1px 5px 1px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txt-VP-SEGDATE-02',
                                                    fieldLabel: 'Date',
                                                    fieldStyle: 'text-align:center;background:#fafafa',
                                                    readOnly: true,
                                                    labelWidth: 70,
                                                    labelAlign: 'right',
                                                    width: 160
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-cont-filter03',
                                    //title:'-cont-filter-form03',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        bodyStyle: 'background: transparent',
                                        border: false,
                                        padding: '5px'
                                    },
                                    hidden: true,
                                    padding: '1px 5px 1px 5px',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-cont-filter-form03',                                            
                                            layout: 'hbox',
                                            defaults: {
                                                padding: '5px 1px 5px 1px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txt-VP-SEGDATE-03',
                                                    fieldLabel: 'Date',
                                                    fieldStyle: 'text-align:center;background:#fafafa',
                                                    readOnly: true,
                                                    labelWidth: 70,
                                                    labelAlign: 'right',
                                                    width: 160
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txt-VP-FNUMBER-03',
                                                    fieldLabel: 'Flight Number ',
                                                    fieldStyle: 'text-align:center;background:#fafafa',
                                                    readOnly: true,
                                                    labelWidth: 90,
                                                    labelAlign: 'right',
                                                    width: 140
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmb-sel-usage',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'description'],
                                                        data: [
                                                            [" ", "All"],
                                                            ["*", "Family Member"],
                                                            ["A", "Invalid Name"],
                                                            ["B", "Exchange ASR"],
                                                            ["C", "Expired"],
                                                            ["D", "Duplicate Booking"],
                                                            ["E", "Exchange"],
                                                            ["F", "Refund ASR"],
                                                            ["H", "Groups"],
                                                            ["I", "Interline"],
                                                            ["M", "Match"],
                                                            ["N", "No Match"],
                                                            ["P", "ATL"],
                                                            ["R", "Refund"],
                                                            ["V", "Flown"],
                                                            ["X", "Cancel"],
                                                            ["Z", "Different passenger"]
                                                        ]
                                                    }),
                                                    fieldLabel: 'Filter By',
                                                    width: 200,
                                                    labelWidth: 75,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'description',
                                                    listConfig: {
                                                        minWidth: 200
                                                    },
                                                    listeners: {
                                                        change: 'onChange_update_filter',
                                                        afterrender: function() {
                                                            Ext.getCmp(prototype.id + '-cmb-sel-usage').setValue(' ');
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
                }
            ]
        }
    ]
});