Ext.define('Ext.Praxis.view.flown.AccountingCouponsForm.Filters', {
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
                        {xtype: 'tbspacer', width: 80},
                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Accounting Date :</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 8},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            caseSensitive: false,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                afterrender: function(combo, eOpts) {
                                    combo.setValue("");
                                },
                                keyup: function(combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[0-9]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                keyDown: '',
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            caseSensitive: false,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                afterrender: function(combo, eOpts) {
                                    combo.setValue("");
                                },
                                keyup: function(combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[0-9]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                keyDown: '',
                            }
                        },
                        {xtype: 'tbspacer', width: 65},
                        // </editor-fold>
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Carrier:</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbUNIFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 60,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {minWidth: 60},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                change: 'cmbTranType_changeHandler' 
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">CIA:</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbCIAFFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 60,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {minWidth: 60},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                change: 'cmbTranType_changeHandler' 
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Type:</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype:'combo',
                            id: prototype.id+'-cmbFTYPEFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 70,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code', 
                            displayField: 'name',
                            listConfig: {minWidth: 70},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                change: 'cmbTranType_changeHandler' 
                            }
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});