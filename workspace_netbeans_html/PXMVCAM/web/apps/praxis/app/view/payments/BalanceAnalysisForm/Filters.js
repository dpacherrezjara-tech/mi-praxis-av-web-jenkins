Ext.define('Ext.Praxis.view.payments.BalanceAnalysisForm.Filters', {
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
            padding: '3px 1px 3px 1px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '3px 1px 3px 1px',
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
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-boxSearchFilter',
                    border: false,
////                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '0px 5px 0px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFECHA',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["1", "Sales Date"],
                                    ["0", "Reception Date"]
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
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                afterrender: function(cmp, eOpts) {
                                    cmp.setValue("1");
                                },
                                keyup: function(combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                keypress: 'onTextKeypress'
                            }
                        }
                        ,
                        {xtype: 'tbspacer', width: 10},
                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                        {
                            xtype: 'label',
                            html: 'From:',
                            align: 'center',
                            fieldStyle: 'text-align: center;'
//                    padding: '5px 7px 5px 0px'
                        },
                        
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            editable: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            typeAhead: true,
                            //listConfig: {maxHeight: 111},
                            listeners: {
                                change: 'onFromYearChange',
//                        focus: function(combo) {
//                            combo.expand();
//                        },
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: true,
                            forceSelection: true,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            width: 60,
                            typeAhead: true,
                            emptyText: 'All',
                            listeners: {
                                change: 'onFromMonthChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            typeAhead: true,
                            listeners: {
                                change: 'onFromDayChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'To:',
                            align: 'center',
                            fieldStyle: 'text-align: center;'
//                    padding: '4px 7px 2px 0px'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            editable: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            typeAhead: true,
                            hiddenLabel: false,
                            listeners: {
                                change: 'onToYearChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: true,
                            forceSelection: true,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            width: 60,
                            emptyText: 'All',
                            typeAhead: true,
                            listeners: {
                                change: 'onToMonthChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: true,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            typeAhead: true,
                            listeners: {
                                change: 'onToDayChange',
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            fieldLabel: 'Source',
                            id: prototype.id + '-cmbFTE',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            autocomplete: true,
                            readOnly: false,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 180,
                            labelWidth: 60,
                            hidden: false
                        }
                        ,
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country',
                            id: prototype.id + '-cmbCountry',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            autocomplete: true,
                            allowBlank: true,
                            selectOnFocus: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            emptyText: 'All',
                            width: 290,
                            labelWidth: 60,
                            anyMatch: false,
                            hidden: false,
                            hiddenLabel: false
                        }
                        ,
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Transaction',
                            margin: '0px 5px 0px 10px',
                            id: prototype.id + '-rbgType',
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Sales   </strong>', name: 'rb', inputValue: 'rbSALES', width: 70, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Refund </strong>', name: 'rb', inputValue: 'rbREFUND', width: 50}
                            ]
                        }
                        ,
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
//                    id: prototype.id + '-panelDateFilters',
                            border: false,
//                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                            layout: 'column',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '8px 5px 8px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Credit Card Type',
                                    id: prototype.id + '-cmbCARDC',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    selectOnFocus: true,
                                    enableKeyEvents: true,
                                    autocomplete: true,
                                    allowBlank: true,
                                    readOnly: false,
                                    editable: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    emptyText: 'All',
                                    width: 300,
                                    anyMatch: false,
                                    labelWidth: 120,
                                    hidden: false,
                                    hiddenLabel: false
                                }
                                ,
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Credit Card Nbr:',
                                    id: prototype.id + '-txtCARD',
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    allowBlank: true,
                                    readOnly: false,
                                    editable: true,
                                    maxLength: 16,
                                    enforceMaxLength: true,
                                    labelWidth: 120,
                                    width: 250,
                                    hidden: true,
                                    hiddenLabel: false,
                                    maskRe: /[0-9]/
                                },
                                {xtype: 'tbspacer', width: 200},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket:',
                                    id: prototype.id + '-txtTKT',
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    allowBlank: true,
                                    readOnly: false,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    width: 220,
                                    labelWidth: 60,
                                    hidden: true,
                                    hiddenLabel: false,
                                    maskRe: /[0-9]/
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: white',
                    id: prototype.id + '-panelPrinc',
                    border: true,
                    layout: 'column',
//                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '2px 7px 2px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgPRINC',
                            fieldLabel: 'Search By',
                            horizontal: true,
                            items: [
                                {boxLabel: '<strong >ACCB </strong>', name: 'rbgSearch', inputValue: 'rbACCB', width: 80, checked: true},
                                {boxLabel: '<strong >Settlement </strong>', name: 'rbgSearch', inputValue: 'rbSETT', width: 120},
                                {boxLabel: '<strong >Payments </strong>', name: 'rbgSearch', inputValue: 'rbPAY', width: 120},
                                //{boxLabel: '<strong >Source </strong>', name: 'rbgSearch', inputValue: 'rbSRC', width: 100}
                            ],
                            listeners: {
                                change: 'rbgPRINC_ChangeType'
                            }
                        }
                        ,
                        {xtype: 'tbspacer', width: 900}
                    ]
                }
                ,
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSelectFli',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '2px 7px 2px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgSELEC',
                            fieldLabel: 'Group By',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Currency   </strong>', name: 'rbgGroup', inputValue: 'rbCURR', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Country </strong>', name: 'rbgGroup', inputValue: 'rbCOUN', width: 100},
                                {boxLabel: '<strong style="color:#046aaa" >Credit Card Code </strong>', name: 'rbgGroup', inputValue: 'rbTARJ', width: 130}

                            ],
                            listeners: {
                                change: 'rbgSELEC_ChangeType'
                            }
                        }
                        ,
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkDetail',
                            margin: '0 20 0 30',
                            width: 80,
                            //hidden:true,
                            boxLabel: '<b>Detail</b>',
                            inputValue: '1',
                            listeners: {
                                change: 'chkDetail_ChangeValue'
                            }
                        }
                    ]
                }

            ]

        }
    ]
});



