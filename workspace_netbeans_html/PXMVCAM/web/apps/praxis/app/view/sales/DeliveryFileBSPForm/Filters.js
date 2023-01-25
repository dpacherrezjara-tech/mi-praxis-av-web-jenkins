Ext.define('Ext.Praxis.view.sales.DeliveryFileBSPForm.Filters', {
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
            defaults: {
                anchor: '100%'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDate',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Processing Date"], ["2", "IDFILE"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 120,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0 6 0',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("1");
                                        },
                                        keypress: 'onTextKeypress',
                                        change: 'imgCmbDate_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="op1">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-op1',
                                    hidden: true,
                                    border: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Enter Processing Date: ',
                                            id: prototype.id+'-LblDateFrom',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtCampo',
                                            fieldStyle: 'text-align:center',
                                            allowBlank: false,
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            value: new Date(),
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 85,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            },
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Enter Country: ',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCampo2',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            maskRe: /[a-zA-Z]/,
                                            width: 40,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Enter City: ',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCampo3',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[a-zA-Z]/,
                                            width: 40,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Time: ',
                                            padding: '6 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCampo4',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            maskRe: /[0-9]/,
                                            width: 50,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="op2">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-op2',
                                    hidden: true,
                                    border: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Enter IDFILE: ',
                                            padding: '6 0',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCampo5',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            maskRe: /[0-9]/,
                                            width: 100,
                                            listeners:{
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});