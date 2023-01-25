Ext.define('Ext.Praxis.view.sales.LoadCommissionADMACMForm.Filters', {
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
                                    text: 'Search By',
                                    style: 'font-weight:bold;',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: '*',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '4 0 5 0',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 17},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cmbOpcion',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "System Date"], ["2", "Period"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 150,
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
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="boxFilter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter01',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    width: 300,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'From:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtFilterDateFrom',
                                            fieldStyle: 'text-align:center;color:blue;',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            maxValue : new Date(),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtFilterDateTo',
                                            fieldStyle: 'text-align:center;color:blue;',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            maxValue : new Date(),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="boxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    width: 300,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'From:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtFilterDateFrom2',
                                            fieldStyle: 'text-align:center;',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtFilterDateTo2',
                                            fieldStyle: 'text-align:center;',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="boxFilter03">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxFilter03',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    width: 300,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbType',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "All"], ["U", "UpFrom"], ["B", "BackEnd"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            forceSelection: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 150,
                                            typeAhead: true,
                                            emptyText: 'All',
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
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 300, id: prototype.id+'-spacio'},
                                {xtype: 'tbspacer', width: 500},
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-btnLoadADM_ACM',
                                    style: 'font-weight:bold;background:#02507A;',
                                    html: '<strong style="color:#000;background:#02507A;color:white;">Load ADM/ACM</strong>',
                                    border: true,
//                                    margin: '2 0 2 0',
                                    listeners:{
                                        click: 'onLoadACM_ADMClick'
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