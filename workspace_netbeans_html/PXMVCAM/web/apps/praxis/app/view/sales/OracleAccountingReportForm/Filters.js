Ext.define('Ext.Praxis.view.sales.OracleAccountingReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            html: 'Module',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 2},
                        {
                            xtype: 'label',
                            text: '*',
                            labelSeparator: ':',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 2},
                        {
                            xtype:'combo',
                            id: prototype.id + '-cboModulo',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "(Select)"],
                                    ["SALES", "Sales"],
                                    ["ADJMASALES", "Sales ADJ (Manual)"],
                                    ["FLOWN", "Flown"],
                                    ["ADJFL", "Flown ADJ (Automatic)"],
                                    ["ADJMAFL", "Flown ADJ (Manual)"],
                                    ["IXP", "Interline Payable"],
                                    ["ADJMAIXP", "Interline Payable ADJ (Manual)"],
                                    ["IXC", "Interline Receivable"],
                                    ["CADUCOS", "Caducos"],
                                    ["ADJCA", "Caducos ADJ (Automatic)"],
                                    ["ADJCAMA", "Caducos ADJ (Manual)"],
                                    ["ADM", "ADM"],
                                    ["FWNTNU", "FLOWN TNU"],
                                    ["IXPTNU", "IXP TNU"],
                                    ["FOB", "FOB"],
                                    ["CONSORTIA", "CONSORTIA"],
                                    ["IXPEST", "IXP Estimated"],
                                    ["IXCEST", "IXC Estimated"],
                                    ["IXPREV", "IXP REV Estimated"],
                                    ["IXCREV", "IXC REV Estimated"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: false,
                            editable: false,
                            width: 194,
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
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
                        },
                        {xtype: 'tbspacer', width: 17},
                        {
                            xtype: 'label',
                            html: 'Date:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtFecha',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});