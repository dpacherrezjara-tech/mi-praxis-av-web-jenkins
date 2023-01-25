Ext.define('Ext.Praxis.view.interline.TAXRATD2Form.Filters', {
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
                            id: prototype.id + '-hbox_filter1',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            hidden: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '8px 7px 8px 0px'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Search By:',
                                    style: 'font-weight:bold;',
                                    padding: '12px 7px 0px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cbxSearchBy',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "TAX Code"], ["2", "Country Code"], ["3", "TUA AM"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 130,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        keypress: 'onTextKeypress',
                                        change: 'cbxSearchBy_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-lblSearchCode',
                                    padding: '12px 7px 0px 0px'
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txt_code',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
//                                    hidden: true,
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-hb_fecha',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                        {
                                            xtype: 'label',
                                            html: 'Year',
                                            fieldStyle: 'text-align: center;',
                                            padding: '4px 7px 0px 0px'
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
                                            editable: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
//                                            listeners: {
//                                                focus: function(combo) {
//                                                    combo.expand();
//                                                }
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            html: 'Month',
                                            fieldStyle: 'text-align: center;',
                                            padding: '4px 7px 0px 0px'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonth',
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
//                                            listeners: {
//                                                focus: function(combo) {
//                                                    combo.expand();
//                                                }
//                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-hbox_filter2',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            hidden: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'City Cod',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txt_CityCod',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
//                                    hidden: true,
                                    width: 45,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Transaction Month',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txt_Date',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9]/,
//                                    hidden: true,
                                    width: 79,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    },
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format YYYYMM'
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