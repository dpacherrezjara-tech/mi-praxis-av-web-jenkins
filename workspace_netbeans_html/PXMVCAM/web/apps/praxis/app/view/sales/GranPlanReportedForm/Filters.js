Ext.define('Ext.Praxis.view.sales.GranPlanReportedForm.Filters', {
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
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 17},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-Cmb_TypeFilter',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Code IATA "], ["2", "Issue Date "], ["3", "Ticket Number "]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 120,
                                    typeAhead: true,
                                    emptyText: 'Select',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (cmp, eOpts) {
                                            cmp.setValue("1");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onCmbDateChange'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option01',
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
                                            text: 'Code IATA:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtCodIATA',
                                            maxLength: 20,
                                            width: 85,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
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
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtA1789FECVT01',
                                            fieldStyle: 'text-align:center;',
                                            allowBlank: false,
                                            format: 'Y/m/d',
                                            maskRe: /[0-9/]/,
                                            minValue: new Date(2000, 00, 01),
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            editable: true,
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
                                            id:prototype.id+'-txtA1789FECVT02',
                                            fieldStyle: 'text-align:center;',
                                            allowBlank: false,
                                            format: 'Y/m/d',
                                            maskRe: /[0-9/]/,
                                            minValue: new Date(2000, 00, 01),
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            editable: true,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="HBox_Option03">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_Option03',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
                                        enforceMaxLength: true,
                                        enableKeyEvents: true
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Ticket Number:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtBrwTKTNumberCia',
                                            fieldStyle: 'text-align:center',
                                            value: '139',
                                            maxLength: 3,
                                            maskRe: /[0-9]/,
                                            readOnly: true,
                                            width: 40
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtBrwTKTNumber',
                                            fieldStyle: 'text-align:center',
                                            maxLength: 10,
                                            maskRe: /[0-9]/,
                                            width: 122,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id+'-rbgCtlStpro',
                                    defaultType: 'radiofield',
                                    style: 'text-align: right;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel  : 'Process',
                                            inputValue: 'X',
                                            checked: false,
                                            name: 'rbgCtlStpro',
                                            listeners: {
                                                change: 'rgchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            boxLabel  : 'Pending',
                                            inputValue: 'P',
                                            checked: true,
                                            name: 'rbgCtlStpro',
                                            listeners: {
                                                change: 'rgchange'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            boxLabel  : 'All',
                                            inputValue: '*',
                                            checked: false,
                                            name: 'rbgCtlStpro',
                                            listeners: {
                                                change: 'rgchange'
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