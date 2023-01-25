Ext.define('Ext.Praxis.view.sales.AccountingMasterClientForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                padding: '5 1',
                anchor: '100%',
                selectOnFocus: true,
                enableKeyEvents: true
            },
            items: [
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By: </strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'Source',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cbxSource',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"], ["ARC", "ARC"], ["BSP", "BSP"],
                            ["ASR", "ASR"], ["MAN", "MAN"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    forceSelection: true,
                    caseSensitive: false,
                    selectOnFocus: false,
                    editable: false,
                    valueField: 'code', displayField: 'name',
                    value: "",
                    typeAhead: true,
                    width: 105,
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function (combo, e) {
                            var key = String.fromCharCode(e.getKey());
                            var filter = /^[a-zA-Z]+$/;
                            var test_bool = filter.test(key);
                            if (test_bool) {
                                combo.doQuery(key);
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 18 },
                {
                    xtype: 'label',
                    html: 'Country',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboCountry',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    selectOnFocus: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    width: 140,
                    enableKeyEvents: true,
                    listConfig: { maxHeight: 111, minWidth: 190 },
                    autoFocus: true,
                    listeners: {
                        blur: function(cmp) {
                            if (cmp.rawValue.length === 0) {
                                if (cmp.getValue() === null) {
                                    cmp.setValue('');
                                }
                            } else {
                                cmp.setRawValue(cmp.rawValue.toUpperCase());
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 18 },
                {
                    xtype: 'label',
                    html: 'Type',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboType',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    width: 71,
                    hiddenLabel: false,
                    listConfig: {maxHeight: 111},
                    listeners: {
                        blur: function(cmp) {
                            if (cmp.rawValue.length === 0) {
                                if (cmp.getValue() === null) {
                                    cmp.setValue('');
                                }
                            } else {
                                cmp.setRawValue(cmp.rawValue.toUpperCase());
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 18 },
                {
                    xtype: 'label',
                    html: 'Currency',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboCurrency',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    width: 85,
                    listConfig: {maxHeight: 111},
                    listeners: {
                        select: function (comp, record, index) {
                            if (comp.rawValue === "&nbsp;") {
                                comp.setValue(null);
                            }
                        },
                        blur: function(cmp) {
                            if (cmp.rawValue.length === 0) {
                                cmp.setValue(null);
                            } else {
                                if (cmp.getValue() === '') {
                                    cmp.setRawValue(cmp.rawValue);
                                } else {
                                    cmp.setRawValue(cmp.rawValue.toUpperCase());
                                }
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 18 },
                {
                    xtype: 'label',
                    html: 'Sub Source',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboSubFu',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    typeAhead: true,
                    width: 85,
                    hiddenLabel: false,
                    listConfig: {maxHeight: 111},
                    listeners: {
                        select: function (comp, record, index) {
                            if (comp.rawValue === "&nbsp;") {
                                comp.setValue(null);
                            }
                        },
                        blur: function(cmp) {
                            if (cmp.rawValue.length === 0) {
                                cmp.setValue(null);
                            } else {
                                cmp.setRawValue(cmp.rawValue.toUpperCase());
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 18 },
                {
                    xtype: 'label',
                    html: 'Payment Form',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboFP',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    valueField: 'code', displayField: 'name',
                    typeAhead: true,
                    width: 85,
                    hiddenLabel: false,
                    listConfig: {maxHeight: 111},
                    listeners: {
                        blur: function(cmp) {
                            if (cmp.rawValue.length === 0) {
                                if (cmp.getValue() === null) {
                                    cmp.setValue('');
                                }
                            } else {
                                cmp.setRawValue(cmp.rawValue.toUpperCase());
                            }
                        }
                    }
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    html: 'Client',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtClient',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 10,
                    width: 80
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    html: 'IATA',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtIATA',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 8,
                    width: 80
                }
            ]
        }
    ]
});

